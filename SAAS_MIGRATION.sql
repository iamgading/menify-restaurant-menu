-- SaaS Migration: Multi-Tenancy & Subscription Support
-- Run this after the initial SETUP.md schema

-- ============================================
-- 1. USERS TABLE (Authentication)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'owner', -- 'owner', 'admin', 'staff'
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. UPDATE RESTAURANTS TABLE
-- ============================================
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active', -- 'active', 'canceled', 'past_due', 'trialing'
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS custom_domain TEXT,
ADD COLUMN IF NOT EXISTS remove_branding BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS analytics_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS menu_item_limit INTEGER DEFAULT 20,
ADD COLUMN IF NOT EXISTS category_limit INTEGER DEFAULT 3;

-- Add foreign key to users
ALTER TABLE restaurants 
ADD CONSTRAINT fk_owner 
FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE;

-- ============================================
-- 3. SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  tier TEXT NOT NULL, -- 'free', 'pro', 'enterprise'
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due', 'trialing'
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  payment_method TEXT, -- 'midtrans', 'stripe', 'manual'
  external_subscription_id TEXT, -- Midtrans/Stripe subscription ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_restaurant ON subscriptions(restaurant_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- 4. INVOICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- in cents/rupiah
  currency TEXT DEFAULT 'IDR',
  status TEXT NOT NULL, -- 'paid', 'pending', 'failed', 'refunded'
  description TEXT,
  invoice_number TEXT UNIQUE,
  invoice_url TEXT,
  paid_at TIMESTAMPTZ,
  due_date TIMESTAMPTZ,
  external_invoice_id TEXT, -- Midtrans/Stripe invoice ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_restaurant ON invoices(restaurant_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- ============================================
-- 5. ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'menu_view', 'item_view', 'item_click', 'whatsapp_click'
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  metadata JSONB, -- Additional event data
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_restaurant ON analytics_events(restaurant_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

-- ============================================
-- 6. USAGE TRACKING TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  menu_views INTEGER DEFAULT 0,
  item_views INTEGER DEFAULT 0,
  whatsapp_clicks INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(restaurant_id, date)
);

CREATE INDEX idx_usage_restaurant_date ON usage_stats(restaurant_id, date);

-- ============================================
-- 7. RLS POLICIES UPDATE
-- ============================================

-- Users can read their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Subscriptions policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their subscriptions"
  ON subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = subscriptions.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- Invoices policies
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their invoices"
  ON invoices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = invoices.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- Analytics policies (Pro+ only)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their analytics"
  ON analytics_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = analytics_events.restaurant_id
      AND restaurants.owner_id = auth.uid()
      AND restaurants.analytics_enabled = true
    )
  );

-- ============================================
-- 8. HELPER FUNCTIONS
-- ============================================

-- Function to check if restaurant is within limits
CREATE OR REPLACE FUNCTION check_menu_item_limit(rest_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  item_limit INTEGER;
BEGIN
  -- Get current count
  SELECT COUNT(*) INTO current_count
  FROM menu_items
  WHERE restaurant_id = rest_id;
  
  -- Get limit
  SELECT menu_item_limit INTO item_limit
  FROM restaurants
  WHERE id = rest_id;
  
  RETURN current_count < item_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to check category limit
CREATE OR REPLACE FUNCTION check_category_limit(rest_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  cat_limit INTEGER;
BEGIN
  SELECT COUNT(*) INTO current_count
  FROM categories
  WHERE restaurant_id = rest_id;
  
  SELECT category_limit INTO cat_limit
  FROM restaurants
  WHERE id = rest_id;
  
  RETURN current_count < cat_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. UPDATE EXISTING DATA
-- ============================================

-- Set default subscription for existing restaurants
UPDATE restaurants
SET 
  subscription_tier = 'free',
  subscription_status = 'active',
  subscription_start_date = NOW(),
  menu_item_limit = 20,
  category_limit = 3
WHERE subscription_tier IS NULL;

-- ============================================
-- DONE! 🎉
-- ============================================
-- Next steps:
-- 1. Run this migration in Supabase SQL Editor
-- 2. Setup Supabase Auth
-- 3. Create signup/login pages
