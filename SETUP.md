# Menify Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurants table
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  address TEXT,
  logo_url TEXT,
  theme_color TEXT DEFAULT '#B85C38',
  whatsapp TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu Items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_best_seller BOOLEAN DEFAULT false,
  is_promo BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_categories_restaurant ON categories(restaurant_id);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_restaurants_slug ON restaurants(slug);

-- Row Level Security (RLS)
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Public read access for customer-facing data
CREATE POLICY "Public can view active restaurants"
  ON restaurants FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = categories.restaurant_id
      AND restaurants.is_active = true
    )
  );

CREATE POLICY "Public can view menu items"
  ON menu_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = menu_items.restaurant_id
      AND restaurants.is_active = true
    )
  );

-- Admin policies (owner can manage their own restaurant)
CREATE POLICY "Owners can manage their restaurants"
  ON restaurants FOR ALL
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can manage their categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = categories.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

CREATE POLICY "Owners can manage their menu items"
  ON menu_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM restaurants
      WHERE restaurants.id = menu_items.restaurant_id
      AND restaurants.owner_id = auth.uid()
    )
  );

-- Seed data for demo restaurant (example)
INSERT INTO restaurants (name, slug, tagline, address, whatsapp, theme_color)
VALUES (
  'Demo Restaurant',
  'demo',
  'Cita Rasa Nusantara Modern',
  'Jl. Contoh No. 123, Jakarta',
  '6281234567890',
  '#B85C38'
);

-- Get the restaurant ID for seed data
DO $$
DECLARE
  resto_id UUID;
  cat_makanan UUID;
  cat_minuman UUID;
  cat_snack UUID;
BEGIN
  SELECT id INTO resto_id FROM restaurants WHERE slug = 'demo';
  
  -- Insert categories
  INSERT INTO categories (restaurant_id, name, sort_order)
  VALUES 
    (resto_id, 'Makanan Utama', 1),
    (resto_id, 'Minuman', 2),
    (resto_id, 'Snack & Dessert', 3);
  
  -- Get category IDs
  SELECT id INTO cat_makanan FROM categories WHERE restaurant_id = resto_id AND name = 'Makanan Utama';
  SELECT id INTO cat_minuman FROM categories WHERE restaurant_id = resto_id AND name = 'Minuman';
  SELECT id INTO cat_snack FROM categories WHERE restaurant_id = resto_id AND name = 'Snack & Dessert';
  
  -- Insert sample menu items
  INSERT INTO menu_items (restaurant_id, category_id, name, price, description, is_best_seller, sort_order)
  VALUES 
    (resto_id, cat_makanan, 'Nasi Goreng Spesial', 25000, 'Nasi goreng dengan telur, ayam, dan sayuran segar', true, 1),
    (resto_id, cat_makanan, 'Mie Goreng Jawa', 22000, 'Mie goreng dengan bumbu khas Jawa', false, 2),
    (resto_id, cat_makanan, 'Ayam Bakar Madu', 35000, 'Ayam bakar dengan saus madu spesial', true, 3),
    (resto_id, cat_minuman, 'Es Teh Manis', 5000, 'Teh manis dingin segar', false, 1),
    (resto_id, cat_minuman, 'Es Jeruk', 8000, 'Jus jeruk segar', false, 2),
    (resto_id, cat_minuman, 'Kopi Susu', 12000, 'Kopi susu hangat', false, 3),
    (resto_id, cat_snack, 'Pisang Goreng', 10000, 'Pisang goreng crispy', false, 1),
    (resto_id, cat_snack, 'Es Krim Vanilla', 15000, 'Es krim vanilla premium', false, 2);
END $$;
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
menify/
├── app/
│   ├── r/[slug]/          # Customer menu pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── customer/          # Customer-facing components
│   └── admin/             # Admin components
├── lib/
│   ├── supabase/          # Supabase clients
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript types
```

## Support

For technical support or inquiries, please contact:
- Email: [support@menify.id](mailto:support@menify.id)
- WhatsApp: [+62 812-3456-7890](https://wa.me/6281234567890)

---

<div align="center">

### Menify

**Simplify Your Menu**  
*Sistem Menu Digital QR untuk Restoran Modern*

[Website](https://menify.id) • [Documentation](https://docs.menify.id) • [Live Demo](https://menify.id/r/demo)

© 2025 Menify. All rights reserved.  
Made with ❤️ for F&B Businesses in Indonesia 🇮🇩

</div>
