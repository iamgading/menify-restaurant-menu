# ✅ Setup Checklist - Menify

## 🎯 Quick Start Checklist

### 1. ✅ Project Setup (DONE)
- [x] Next.js project initialized
- [x] Dependencies installed
- [x] TypeScript configured
- [x] Tailwind CSS configured
- [x] Project structure created

### 2. 🔧 Supabase Setup (TODO - User Action Required)

#### Step 1: Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Click "New Project"
- [ ] Choose organization and project name
- [ ] Select region (closest to your users)
- [ ] Generate and save database password

#### Step 2: Run Database Schema
- [ ] Open Supabase Dashboard
- [ ] Go to SQL Editor
- [ ] Copy SQL from `SETUP.md` (lines 10-180)
- [ ] Run the SQL script
- [ ] Verify tables created: `restaurants`, `categories`, `menu_items`

#### Step 3: Get API Credentials
- [ ] Go to Settings > API
- [ ] Copy `Project URL`
- [ ] Copy `anon/public` key

#### Step 4: Configure Environment
- [ ] Create `.env.local` file in project root
- [ ] Add:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

### 3. 🚀 Run Development Server

```bash
cd menify
npm run dev
```

- [ ] Server starts successfully
- [ ] No build errors
- [ ] Open http://localhost:3000

### 4. ✅ Verify Customer Menu

Visit: `http://localhost:3000/r/demo`

- [ ] Page loads without errors
- [ ] Restaurant header displays
- [ ] Search bar visible
- [ ] Category tabs visible
- [ ] Menu items display with:
  - [ ] Images (or placeholder)
  - [ ] Names
  - [ ] Prices (in Rupiah)
  - [ ] Badges (Best Seller, Promo)
- [ ] Click on item opens detail modal
- [ ] Search filters items in real-time
- [ ] Category tabs scroll to sections
- [ ] WhatsApp button visible (if phone number set)

### 5. 🔐 Setup Admin Access (Optional for MVP)

#### Create Admin User
In Supabase Dashboard > Authentication:
- [ ] Click "Add User"
- [ ] Enter email and password
- [ ] Confirm user created

#### Link User to Restaurant
In SQL Editor, run:
```sql
UPDATE restaurants 
SET owner_id = 'user-id-from-auth'
WHERE slug = 'demo';
```

#### Test Admin Login
- [ ] Visit `http://localhost:3000/admin/login`
- [ ] Login with credentials
- [ ] Redirects to dashboard
- [ ] Restaurant info displays

### 6. 📱 QR Code Generation

For now, use online tools:
- [ ] Go to [qr-code-generator.com](https://www.qr-code-generator.com/)
- [ ] Input: `http://localhost:3000/r/demo`
- [ ] Download QR code
- [ ] Print and test scanning

### 7. 🎨 Customization (Optional)

#### Update Restaurant Info
In Supabase > Table Editor > restaurants:
- [ ] Update `name`
- [ ] Update `tagline`
- [ ] Update `address`
- [ ] Update `whatsapp` (format: 6281234567890)
- [ ] Upload logo to Supabase Storage
- [ ] Update `logo_url`

#### Add Menu Items
In Supabase > Table Editor > menu_items:
- [ ] Add new items
- [ ] Upload images to Supabase Storage
- [ ] Update `image_url` fields
- [ ] Set `is_best_seller` or `is_promo` flags

### 8. 🚀 Deployment (When Ready)

#### Vercel Deployment
- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables
- [ ] Deploy
- [ ] Test production URL

#### Update QR Codes
- [ ] Generate new QR with production URL
- [ ] Print and distribute
- [ ] Test scanning

### 9. 📊 Testing Checklist

#### Mobile Testing
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test on different screen sizes
- [ ] Verify touch targets (44px minimum)

#### Feature Testing
- [ ] Search works correctly
- [ ] Category navigation smooth
- [ ] Images load properly
- [ ] Modal opens/closes
- [ ] WhatsApp link works
- [ ] All badges display correctly

#### Performance Testing
- [ ] Page loads < 2 seconds
- [ ] Images lazy load
- [ ] No console errors
- [ ] Smooth scrolling

### 10. 🎯 Go Live Checklist

- [ ] All menu items added
- [ ] All images uploaded
- [ ] Prices verified
- [ ] Contact info correct
- [ ] QR codes printed
- [ ] Staff trained
- [ ] Backup plan ready

## 🆘 Troubleshooting

### Issue: "Restaurant not found"
**Solution**: 
1. Check Supabase connection
2. Verify `is_active = true` in database
3. Check slug matches URL

### Issue: Images not loading
**Solution**:
1. Verify image URLs are accessible
2. Check Supabase Storage permissions
3. Use absolute URLs

### Issue: Build errors
**Solution**:
1. Run `npm install` again
2. Delete `.next` folder
3. Restart dev server

### Issue: TypeScript errors
**Solution**:
1. Check `types/database.ts` matches schema
2. Run `npx tsc --noEmit` to see all errors
3. Most errors are warnings and won't affect runtime

## 📞 Need Help?

- **Documentation**: Check `README.md`, `SETUP.md`, `DEPLOYMENT.md`
- **Supabase Issues**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Issues**: [nextjs.org/docs](https://nextjs.org/docs)

## 🎉 Success Criteria

Your setup is complete when:
- ✅ Menu page loads and displays items
- ✅ Search and navigation work
- ✅ QR code scans to menu page
- ✅ Mobile experience is smooth
- ✅ No console errors

---

**Current Status**: Development server running ✅
**Next Step**: Setup Supabase and configure environment variables
