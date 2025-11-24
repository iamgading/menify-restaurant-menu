import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { ArrowRight, Target, Heart, Zap, Users, TrendingUp, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 mb-6">
              <Heart className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">Tentang Kami</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Membantu UMKM F&B <br />
              <span className="text-gradient-primary">Go Digital</span>
            </h1>
            
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Menify lahir dari keinginan sederhana: membuat teknologi restoran yang powerful, tapi tetap terjangkau untuk semua pelaku usaha F&B di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="text-3xl font-bold font-heading text-foreground mb-6">Cerita Kami</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Berawal dari pengalaman pribadi melihat banyak warung dan cafe kecil yang kesulitan bersaing dengan restoran besar karena keterbatasan teknologi. Menu kertas yang mahal untuk di-update, sistem kasir yang ribet, dan tidak ada data untuk mengambil keputusan bisnis.
            </p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Kami percaya bahwa setiap pemilik usaha F&B, dari warung nasi goreng di pinggir jalan hingga cafe specialty coffee, berhak mendapatkan akses ke teknologi yang sama dengan restoran besar. Tanpa harus keluar modal jutaan rupiah atau hire tim IT.
            </p>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Itulah kenapa Menify hadir: <strong className="text-foreground">Menu digital QR yang powerful, tapi tetap gratis untuk fitur dasar.</strong> Karena kami ingin melihat UMKM F&B Indonesia maju bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-6 shadow-lg">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Misi Kami</h3>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Memberdayakan 100.000+ UMKM F&B di Indonesia dengan teknologi digital yang terjangkau, sehingga mereka bisa fokus pada apa yang mereka kuasai: membuat makanan enak.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-primary dark:hover:border-primary transition-all duration-500 hover:-translate-y-2 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-6 shadow-lg">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Visi Kami</h3>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Menjadi platform #1 untuk digitalisasi restoran di Indonesia, di mana setiap warung, cafe, dan restoran punya akses ke teknologi kelas dunia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Nilai-Nilai Kami
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-xl max-w-2xl mx-auto">
              Prinsip yang memandu setiap keputusan kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={24} />,
                title: "Customer First",
                desc: "Kebutuhan pelanggan adalah prioritas utama. Setiap fitur dirancang untuk memudahkan hidup pemilik restoran."
              },
              {
                icon: <TrendingUp size={24} />,
                title: "Affordable Innovation",
                desc: "Teknologi canggih tidak harus mahal. Kami percaya inovasi harus accessible untuk semua."
              },
              {
                icon: <Award size={24} />,
                title: "Quality & Simplicity",
                desc: "Produk yang powerful tapi tetap simple. Tidak perlu training bertele-tele untuk mulai pakai."
              }
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-primary mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent dark:via-orange-950/10">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-6 text-foreground">
            Siap Bergabung dengan <br />
            <span className="text-gradient-primary">Ribuan Restoran Lainnya?</span>
          </h2>
          <p className="text-xl text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto">
            Mulai gratis hari ini. Tidak perlu kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#pricing">
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 shadow-xl shadow-orange-500/25 h-14 px-8 font-bold">
                Lihat Harga
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 font-bold border-2">
                Kembali ke Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
