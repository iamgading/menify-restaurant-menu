import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { notFound } from 'next/navigation'

// Blog posts database (same as index)
const blogPosts: Record<string, {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  content: string
}> = {
  'cara-meningkatkan-penjualan-restoran': {
    title: '5 Cara Meningkatkan Penjualan Restoran dengan Menu Digital',
    excerpt: 'Pelajari strategi terbukti untuk boost penjualan restoran Anda hingga 30% menggunakan menu digital QR.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    category: 'Tips Bisnis',
    date: '2025-01-15',
    readTime: '5 min',
    content: `
Menu digital QR bukan hanya trend, tapi solusi nyata untuk meningkatkan penjualan restoran. Berikut 5 cara yang terbukti efektif:

## 1. Tampilkan Foto Makanan yang Menggugah Selera

Penelitian menunjukkan bahwa menu dengan foto berkualitas tinggi meningkatkan pemesanan hingga 30%. Pastikan setiap item punya foto yang:
- Pencahayaan natural
- Angle yang menarik
- Resolusi tinggi
- Menampilkan porsi yang realistis

## 2. Highlight Menu Best Seller

Buat section khusus untuk menu favorit pelanggan. Ini membantu customer baru untuk langsung order item yang paling laris.

## 3. Update Harga Real-Time

Dengan menu digital, Anda bisa update harga kapan saja tanpa biaya cetak ulang. Manfaatkan ini untuk:
- Promo happy hour
- Diskon hari tertentu
- Seasonal pricing

## 4. Tambahkan Deskripsi yang Menarik

Jangan cuma tulis nama menu. Tambahkan deskripsi yang bikin ngiler:
- Bahan utama
- Cara masak
- Rasa yang dominan
- Rekomendasi pairing

## 5. Analisa Data Pemesanan

Menu digital memberikan data berharga tentang:
- Item paling sering dilihat
- Waktu peak order
- Menu yang jarang dipesan

Gunakan data ini untuk optimasi menu dan strategi marketing.

---

**Kesimpulan:** Menu digital QR adalah investasi yang worth it untuk restoran modern. Dengan Menify, Anda bisa implement semua strategi di atas dengan mudah.
    `
  },
  'keuntungan-menu-digital-vs-menu-kertas': {
    title: 'Menu Digital vs Menu Kertas: Mana yang Lebih Menguntungkan?',
    excerpt: 'Analisis lengkap perbandingan biaya, efisiensi, dan customer experience antara menu digital dan menu kertas.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    category: 'Panduan',
    date: '2025-01-10',
    readTime: '7 min',
    content: `
Mari kita bandingkan secara objektif antara menu digital dan menu kertas dari berbagai aspek bisnis.

## Perbandingan Biaya

### Menu Kertas:
- Cetak awal: Rp 500.000 - 1.000.000
- Update/revisi: Rp 300.000 - 500.000 per bulan
- Total per tahun: **Rp 4.000.000 - 7.000.000**

### Menu Digital:
- Setup awal: **Rp 0** (dengan Menify)
- Biaya bulanan: Rp 0 - 99.000
- Total per tahun: **Rp 0 - 1.188.000**

**Penghematan: 70-100%**

## Efisiensi Operasional

Menu digital menang telak dalam hal:
- Update instant (detik vs hari)
- Tidak perlu stok menu cadangan
- Tidak rusak/kotor
- Bisa diakses dari mana saja

## Customer Experience

Pelanggan modern lebih suka menu digital karena:
- Bisa zoom foto makanan
- Search menu dengan mudah
- Lihat review/rating
- Order langsung dari HP

## Hygiene & Sustainability

Menu digital lebih higienis (no touch) dan ramah lingkungan (paperless).

---

**Verdict:** Menu digital jelas lebih menguntungkan dari segi biaya, efisiensi, dan customer satisfaction.
    `
  },
  'tips-foto-menu-makanan-menarik': {
    title: 'Tips Foto Menu Makanan yang Bikin Pelanggan Ngiler',
    excerpt: 'Rahasia food photography untuk menu digital yang bisa meningkatkan conversion rate hingga 40%.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    category: 'Marketing',
    date: '2025-01-05',
    readTime: '6 min',
    content: `
Foto makanan yang bagus bisa jadi game changer untuk menu digital Anda. Berikut tipsnya:

## 1. Gunakan Cahaya Natural

Foto di dekat jendela saat siang hari. Hindari flash yang bikin makanan terlihat flat dan tidak appetizing.

## 2. Angle yang Tepat

- **45 derajat**: Untuk makanan berlapis (burger, cake)
- **Top-down**: Untuk plating artistik (salad, pasta)
- **Eye-level**: Untuk minuman dan dessert tinggi

## 3. Styling Sederhana

Jangan over-styling. Fokus pada makanan, bukan props. Gunakan:
- Piring/mangkok polos
- Background netral
- Garnish minimal tapi fresh

## 4. Edit dengan Bijak

- Tingkatkan brightness sedikit
- Saturasi warna secukupnya
- Crop untuk komposisi yang balance
- Jangan sampai terlihat fake

## 5. Konsistensi adalah Kunci

Gunakan style foto yang sama untuk semua menu. Ini bikin menu terlihat profesional dan cohesive.

---

**Pro Tip:** Foto saat makanan baru keluar dari dapur. Steam dan freshness akan terlihat di foto!
    `
  },
  'strategi-pricing-menu-restoran': {
    title: 'Strategi Pricing Menu yang Maksimalkan Profit',
    excerpt: 'Pelajari psikologi pricing dan cara menentukan harga menu yang optimal untuk bisnis F&B Anda.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    category: 'Tips Bisnis',
    date: '2025-01-01',
    readTime: '8 min',
    content: `
Pricing bukan cuma soal cost + margin. Ada psikologi di baliknya yang bisa boost profit Anda.

## 1. Charm Pricing

Harga Rp 49.000 terasa lebih murah dari Rp 50.000 di mata customer, meski bedanya cuma Rp 1.000.

## 2. Anchor Pricing

Taruh item mahal di menu untuk bikin item lain terlihat lebih reasonable. Contoh:
- Steak Premium: Rp 250.000
- Steak Regular: Rp 150.000 ← Jadi terlihat worth it

## 3. Menu Engineering

Kategorikan menu Anda:
- **Stars**: High profit, high popularity → Highlight!
- **Plowhorses**: Low profit, high popularity → Naikkan harga sedikit
- **Puzzles**: High profit, low popularity → Improve marketing
- **Dogs**: Low profit, low popularity → Hapus atau revamp

## 4. Bundling Strategy

Paket combo dengan harga lebih murah dari beli satuan. Ini increase average transaction value.

## 5. Dynamic Pricing

Manfaatkan menu digital untuk:
- Happy hour pricing
- Weekend premium
- Seasonal adjustments

---

**Bottom Line:** Pricing yang smart bisa increase profit 20-30% tanpa mengurangi customer satisfaction.
    `
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container max-w-4xl mx-auto px-4">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-bold mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-3xl font-bold mt-12 mb-4 text-foreground">{paragraph.replace('## ', '')}</h2>
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-2xl font-bold mt-8 mb-3 text-foreground">{paragraph.replace('### ', '')}</h3>
              } else if (paragraph.startsWith('- ')) {
                return <li key={i} className="text-stone-600 dark:text-stone-400 ml-6">{paragraph.replace('- ', '')}</li>
              } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={i} className="font-bold text-foreground my-4">{paragraph.replace(/\*\*/g, '')}</p>
              } else if (paragraph.trim() === '---') {
                return <hr key={i} className="my-8 border-stone-300 dark:border-stone-700" />
              } else if (paragraph.trim()) {
                return <p key={i} className="text-stone-600 dark:text-stone-400 leading-relaxed my-4">{paragraph}</p>
              }
              return null
            })}
          </div>

          {/* Share & Back */}
          <div className="mt-16 pt-8 border-t border-stone-300 dark:border-stone-700 flex justify-between items-center">
            <Link href="/blog">
              <Button variant="outline" className="rounded-xl border-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Blog
              </Button>
            </Link>
            
            <Button variant="outline" className="rounded-xl border-2">
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
