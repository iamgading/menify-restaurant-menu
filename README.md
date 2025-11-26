# 🍽️ Menify - Digital Menu Platform

> Transform your restaurant menu into a beautiful, scannable QR experience

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ecf8e)](https://supabase.com/)

## ✨ Features

- 🎨 **Beautiful Landing Page** - Premium design with glassmorphism & animations
- 🔐 **Secure Authentication** - Powered by Supabase Auth
- 📱 **Responsive Dashboard** - Full CRUD for menu & categories
- 🖼️ **Image Upload** - Supabase Storage integration
- 📊 **QR Code Generation** - Instant QR codes for each restaurant
- 🌐 **Live Menu** - Customer-facing menu with search & filters
- 🔒 **Production-Ready Security** - RLS policies enabled
- 💰 **Subscription Model** - Free & Pro plans ready

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Icons:** Lucide React
- **Deployment:** Netlify / Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/[username]/menify-web.git
cd menify-web

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 📱 Screenshots

### Landing Page
Beautiful, modern landing page with premium design

### Dashboard
Full-featured dashboard for menu management

### Live Menu
Customer-facing menu with QR code access

## 🎯 Usage

1. **Sign Up** - Create your restaurant account
2. **Setup** - Add restaurant info & logo
3. **Create Menu** - Add categories & menu items
4. **Generate QR** - Download QR code
5. **Go Live** - Print QR & place on tables

## 🔐 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Secure authentication
- ✅ Protected API routes
- ✅ Input validation
- ✅ Environment variables

## 📊 Project Structure

```
menify-web/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── dashboard/         # Dashboard pages
│   ├── r/[slug]/          # Live menu (customer view)
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── customer/         # Customer-facing components
│   └── premium/          # Premium components
├── lib/                   # Utilities & helpers
├── types/                 # TypeScript types
└── public/                # Static assets
```

## 🚀 Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Import to Netlify
3. Set environment variables
4. Deploy!

### Vercel

```bash
npm i -g vercel
vercel --prod
```

## 💰 Pricing Model

### Free Plan
- 20 menu items
- 3 categories
- Basic features
- Menify branding

### Pro Plan (Rp 50k/month)
- Unlimited items
- Unlimited categories
- Analytics dashboard
- Custom branding
- Priority support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**⭐ If you find this project useful, please consider giving it a star!**
