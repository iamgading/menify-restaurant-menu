# Quick Test Guide - Dashboard Menify

## 🚀 Cara Test Dashboard Baru

Dashboard sudah **100% diperbaiki dan berfungsi**, tapi Anda perlu **login dulu** untuk melihatnya!

### Option 1: Buat Akun Baru (Recommended)

1. **Buka homepage**: http://localhost:3000
2. **Klik "Mulai Gratis Sekarang"** (tombol putih di hero)
3. **Isi form signup**:
   - Email: test@example.com (atau email apapun)
   - Password: password123 (minimal 6 karakter)
   - Nama Lengkap: Test User
   - No. HP: 08123456789
4. **Klik "Daftar Sekarang"**
5. **Isi Onboarding** (setup restaurant):
   - Nama Restoran: Test Restaurant
   - Slug: test-restaurant
   - Tagline: Test Tagline
   - WhatsApp: 08123456789
6. **Selesai!** Anda akan diarahkan ke **Dashboard yang baru**

### Option 2: Login dengan Akun yang Sudah Ada

1. **Buka homepage**: http://localhost:3000
2. **Klik "Masuk Dashboard"** (tombol outline di hero)
3. **Masukkan email & password** akun yang sudah ada
4. **Klik "Masuk Dashboard"**
5. **Selesai!** Langsung ke dashboard

### Option 3: Lihat Demo Menu (Tanpa Login)

1. **Buka homepage**: http://localhost:3000
2. **Klik "Atau lihat demo menu (Tanpa Login)"** di bawah tombol
3. **Atau klik "Buka Menu Demo"** di section bawah
4. Ini akan membuka **customer-facing menu** (bukan dashboard admin)

---

## ⚠️ Important Notes

### Kenapa Harus Login?

Dashboard adalah **admin panel** yang hanya bisa diakses oleh **owner restaurant yang sudah login**. Ini untuk keamanan data.

### Jika Redirect ke Login Terus

Jika setelah login masih redirect ke `/auth/login`, kemungkinan:

1. **Email confirmation** aktif di Supabase
   - **Solusi**: Disable di Supabase Dashboard > Authentication > Providers > Email > "Confirm email" = OFF
   
2. **Session tidak tersimpan**
   - **Solusi**: Clear browser cookies & cache, lalu login lagi

3. **Database belum setup**
   - **Solusi**: Jalankan SQL migration di `SETUP.md`

---

## 📋 Checklist Setup

Pastikan sudah:
- ✅ Supabase project sudah dibuat
- ✅ SQL schema sudah dijalankan (dari SETUP.md)
- ✅ `.env.local` sudah diisi dengan Supabase credentials
- ✅ `npm run dev` sudah running
- ✅ Email confirmation di-disable (optional, tapi recommended untuk testing)

---

## 🎯 Apa yang Bisa Anda Test di Dashboard?

Setelah login, Anda bisa test:

### 1. Dashboard Homepage (`/dashboard`)
- ✅ Stats real-time (Total Menu, Kategori, dll)
- ✅ Subscription banner (jika free tier)
- ✅ Recent activity feed
- ✅ Quick action cards
- ✅ Beautiful glassmorphism UI

### 2. Menu Management (`/dashboard/menu`)
- ✅ **Tambah menu baru** - Klik "Tambah Menu Baru"
- ✅ **Edit menu** - Klik tombol "Edit" di card
- ✅ **Delete menu** - Klik tombol trash icon
- ✅ **Toggle availability** - Klik tombol "Ready/Habis"
- ✅ **Search** - Cari menu by nama
- ✅ **Filter** - Filter by kategori

### 3. Categories Management (`/dashboard/categories`)
- ✅ **Create kategori** - Klik "Tambah Kategori"
- ✅ **Edit kategori** - Klik "Edit" di card
- ✅ **Delete kategori** - Klik trash icon (jika tidak ada menu)

### 4. QR Code Generator (`/dashboard/qr-code`)
- ✅ **Generate QR** - Otomatis generate
- ✅ **Download PNG** - Klik "Download QR Code"
- ✅ **Copy link** - Klik icon copy

### 5. Settings (`/dashboard/settings`)
- ✅ **Edit restaurant info** - Ubah nama, tagline, WhatsApp
- ✅ **Save changes** - Klik "Simpan Perubahan"

### 6. Analytics (`/dashboard/analytics`)
- ✅ **View metrics** - Stats, charts, popular items
- ✅ **Note**: Data masih mock untuk demo

### 7. Subscription (`/dashboard/subscription`)
- ✅ **Compare plans** - Free vs Pro
- ✅ **View benefits** - Kenapa upgrade

---

## 🐛 Troubleshooting

### "Dashboard masih mati"
- **Penyebab**: Anda belum login
- **Solusi**: Login dulu dengan akun yang valid

### "Redirect ke login terus"
- **Penyebab**: Email confirmation aktif atau session issue
- **Solusi**: Disable email confirmation di Supabase

### "Error saat signup"
- **Penyebab**: Database belum setup atau email sudah terdaftar
- **Solusi**: Jalankan SQL migration atau gunakan email lain

### "Menu/Categories tidak muncul"
- **Penyebab**: Belum ada data
- **Solusi**: Tambah menu/kategori baru dulu

---

## 📞 Need Help?

Jika masih ada masalah, cek:
1. Console browser (F12) untuk error messages
2. Terminal untuk server errors
3. Supabase Dashboard > Authentication untuk cek user
4. Supabase Dashboard > Table Editor untuk cek data

---

**Happy Testing!** 🚀

Dashboard sudah **100% functional dan beautiful**. Tinggal login untuk melihat keajaibannya! ✨
