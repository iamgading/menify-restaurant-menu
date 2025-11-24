# 🍽️ Menify

**Sistem Menu Digital QR untuk Restoran** - Aplikasi web modern untuk menampilkan menu restoran melalui QR code dengan dashboard admin yang mudah digunakan.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?logo=supabase)

## ✨ Fitur Utama

### Customer Side (Menu Digital)
- ✅ **QR Code Access** - Scan dan langsung lihat menu
- ✅ **Search Real-time** - Cari menu dengan cepat
- ✅ **Category Navigation** - Tab kategori sticky dengan smooth scroll
- ✅ **Item Details** - Modal detail dengan foto dan deskripsi lengkap
- ✅ **Badge System** - Best Seller, Promo, dan status Habis
- ✅ **WhatsApp Integration** - Tombol chat langsung ke WhatsApp
- ✅ **Mobile First** - Optimized untuk pengalaman mobile
- ✅ **Lazy Loading** - Gambar dimuat secara efisien

### Admin Side (Dashboard)
- 🚧 **Authentication** - Login/logout dengan Supabase Auth
- 🚧 **Restaurant Settings** - Kelola profil restoran
- 🚧 **Category Management** - CRUD kategori dengan drag-drop sorting
- 🚧 **Menu Management** - CRUD menu item dengan upload foto
- 🚧 **Stock Management** - Toggle available/sold out
- 🚧 **QR Generator** - Generate dan download QR code

*Note: Admin dashboard sedang dalam development*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ dan npm
- Akun Supabase (gratis di [supabase.com](https://supabase.com))

### 1. Clone & Install

```bash
cd menify
npm install
```

### 2. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Buka **SQL Editor** di dashboard Supabase
3. Copy semua SQL dari file `SETUP.md` dan jalankan
4. Ambil **Project URL** dan **Anon Key** dari Settings > API

### 3. Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📱 Demo

- **Homepage**: `http://localhost:3000`
- **Demo Menu**: `http://localhost:3000/r/demo` (setelah setup seed data)

## 🎨 Design System

### Color Palette (Warm Nusantara Theme)

```css
Primary (Terracotta): #B85C38
Secondary (Warm Cream): #FFF8F1
Accent (Green Leaf): #2E7D32
Background: #FFFFFF
Text: #1F1F1F
```

### Typography
- Font Family: Inter, Plus Jakarta Sans
- Minimum Font Size: 16px (accessibility)
- Minimum Tap Target: 44px (mobile friendly)

## 📂 Project Structure

```
menify/
├── app/
│   ├── r/[slug]/          # Customer menu pages (dynamic route)
│   │   └── page.tsx       # Server-side data fetching
│   ├── admin/             # Admin dashboard (coming soon)
│   ├── api/               # API routes (coming soon)
│   ├── globals.css        # Global styles & theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   ├── customer/          # Customer-facing components
│   │   ├── menu-page-client.tsx
│   │   ├── menu-item-card.tsx
│   │   ├── category-tabs.tsx
│   │   ├── menu-search.tsx
│   │   └── item-detail-modal.tsx
│   └── admin/             # Admin components (coming soon)
├── lib/
│   ├── supabase/
│   │   ├── client.ts      # Browser Supabase client
│   │   └── server.ts      # Server Supabase client
│   └── utils.ts           # Utility functions
├── types/
│   └── database.ts        # TypeScript database types
├── SETUP.md               # Database schema & setup guide
└── README.md              # This file
```

## 🗄️ Database Schema

### Tables

**restaurants**
- Menyimpan data restoran (nama, slug, logo, theme, WhatsApp, dll)

**categories**
- Kategori menu (Makanan Utama, Minuman, Snack, dll)
- Sortable dengan `sort_order`

**menu_items**
- Item menu dengan foto, harga, deskripsi
- Flags: `is_available`, `is_best_seller`, `is_promo`
- Sortable per kategori

### Row Level Security (RLS)

- ✅ Public dapat melihat menu dari restoran aktif
- ✅ Owner hanya bisa manage data restoran sendiri
- ✅ Admin policies untuk CRUD operations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui pattern
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Icons**: Lucide React
- **QR Code**: qrcode library

## 📋 Development Roadmap

### ✅ Phase 1: Customer Menu (MVP) - DONE
- [x] Menu page dengan kategori
- [x] Search functionality
- [x] Item detail modal
- [x] Badge system
- [x] WhatsApp integration
- [x] Responsive design

### 🚧 Phase 2: Admin Dashboard - IN PROGRESS
- [ ] Authentication (login/logout)
- [ ] Restaurant settings page
- [ ] Category CRUD
- [ ] Menu item CRUD
- [ ] Photo upload to Supabase Storage
- [ ] QR code generator & download

### 📅 Phase 3: Polish & Optimization
- [ ] Image optimization
- [ ] Performance tuning (LCP < 2s)
- [ ] SEO optimization
- [ ] Error boundaries
- [ ] Loading states
- [ ] Empty states

### 🔮 Future Enhancements (v2)
- [ ] Multi-restaurant support (SaaS mode)
- [ ] QR per table
- [ ] Analytics dashboard
- [ ] Cart & ordering system
- [ ] Payment integration
- [ ] Multi-language support

## 🧪 Testing

```bash
# Run type checking
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Yes |

## 🤝 Contributing

Contributions are welcome! Untuk development:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component patterns
- [Lucide](https://lucide.dev/) - Beautiful icons

---

Made with ❤️ by Menify Team
