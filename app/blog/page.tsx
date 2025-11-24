import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, ArrowLeft } from 'lucide-react'

// Dummy blog posts data
const blogPosts = [
  {
    slug: 'cara-meningkatkan-penjualan-restoran',
    title: '5 Cara Meningkatkan Penjualan Restoran dengan Menu Digital',
    excerpt: 'Pelajari strategi terbukti untuk boost penjualan restoran Anda hingga 30% menggunakan menu digital QR.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    category: 'Tips Bisnis',
    date: '2025-01-15',
    readTime: '5 min'
  },
  {
    slug: 'keuntungan-menu-digital-vs-menu-kertas',
    title: 'Menu Digital vs Menu Kertas: Mana yang Lebih Menguntungkan?',
    excerpt: 'Analisis lengkap perbandingan biaya, efisiensi, dan customer experience antara menu digital dan menu kertas.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    category: 'Panduan',
    date: '2025-01-10',
    readTime: '7 min'
  },
  {
    slug: 'tips-foto-menu-makanan-menarik',
    title: 'Tips Foto Menu Makanan yang Bikin Pelanggan Ngiler',
    excerpt: 'Rahasia food photography untuk menu digital yang bisa meningkatkan conversion rate hingga 40%.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    category: 'Marketing',
    date: '2025-01-05',
    readTime: '6 min'
  },
  {
    slug: 'strategi-pricing-menu-restoran',
    title: 'Strategi Pricing Menu yang Maksimalkan Profit',
    excerpt: 'Pelajari psikologi pricing dan cara menentukan harga menu yang optimal untuk bisnis F&B Anda.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    category: 'Tips Bisnis',
    date: '2025-01-01',
    readTime: '8 min'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 mb-6">
              <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">📚 Blog</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Tips & Insights <br />
              <span className="text-gradient-primary">Bisnis F&B</span>
            </h1>
            
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Artikel, panduan, dan strategi untuk membantu bisnis restoran Anda berkembang.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}>
                <article className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  
                  <div className="relative h-full rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 shadow-xl overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-2 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 text-center">
        <Link href="/">
          <Button variant="outline" className="rounded-xl border-2 h-12 px-6 font-bold">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Home
          </Button>
        </Link>
      </section>
    </div>
  )
}
