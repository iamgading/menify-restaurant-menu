import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TestimonialCard, HowItWorks, FAQSection, PricingSection } from "@/components/premium";
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo';
import { QrCode, Smartphone, Zap, PlayCircle, Rocket, BarChart3, ArrowRight, Store, ShoppingBag, Star, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Add padding to prevent content from being hidden under navbar */}
      <div className="pt-16 min-h-screen bg-background overflow-x-hidden font-sans selection:bg-primary/30 selection:text-primary transition-colors duration-300">
      
      {/* Hero Section - Adaptive Premium */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.2] -z-10 transition-colors duration-500" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 dark:bg-primary/20 rounded-[100%] blur-[120px] -z-10 animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative max-w-7xl mx-auto px-4 z-10">
          <div className="flex flex-col items-center text-center space-y-10">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 dark:bg-orange-400/10 border border-orange-500/20 dark:border-orange-400/20 backdrop-blur-md animate-fade-in-up shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-stone-600 dark:text-stone-300">The Future of Restaurant Menu</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold font-heading tracking-tighter leading-tight max-w-5xl mx-auto text-foreground">
              <span className="text-gradient-hero block mb-2">Upgrade Restoran</span>
              <span className="text-gradient-primary">Ke Level Digital.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed font-heading font-medium">
              Tinggalkan menu kertas. Beralih ke sistem QR modern yang <span className="text-foreground font-semibold">cepat</span>, <span className="text-foreground font-semibold">elegan</span>, dan <span className="text-foreground font-semibold">hemat biaya</span>. Setup dalam 5 menit.
            </p>

            {/* CTAs - Gradient Premium */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 w-full sm:w-auto">
              {/* Button 1: Mulai Gratis - Milk Chocolate/Bronze with Glossy Shine */}
              <Link href="/login" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="group w-full sm:w-auto text-lg px-10 py-8 rounded-2xl bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#78350F] hover:from-[#92400E] hover:via-[#B45309] hover:to-[#92400E] text-white shadow-[0_0_40px_-12px_rgba(120,53,15,0.6)] hover:shadow-[0_0_60px_-10px_rgba(146,64,14,0.8)] transition-all duration-500 border-2 border-[#92400E]/40 hover:border-[#B45309]/60 font-bold magnetic-hover relative overflow-hidden"
                >
                  {/* Metallic shimmer for depth */}
                  <span className="absolute inset-0 shimmer opacity-50" />
                  
                  {/* Glossy shine effect - animated light sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                  
                  {/* Subtle highlight overlay for 3D effect */}
                  <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  
                  {/* Bottom shadow for depth */}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Content */}
                  <Rocket className="w-5 h-5 mr-2 relative z-10 group-hover:translate-y-[-2px] transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  <span className="relative z-10 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Mulai Gratis</span>
                </Button>
              </Link>

              {/* Button 2: Lihat Demo - Warm Cream/Latte Gradient */}
              <Link href="/r/demo" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="group w-full sm:w-auto text-lg px-10 py-8 rounded-2xl bg-gradient-to-r from-[#FFF8F0] via-[#E8DCC4] to-[#FFF8F0] dark:from-[#2C1810] dark:via-[#4A3B32] dark:to-[#2C1810] hover:from-[#E8DCC4] hover:via-[#D7C0A0] hover:to-[#E8DCC4] dark:hover:from-[#4A3B32] dark:hover:via-[#5D4037] dark:hover:to-[#4A3B32] border-2 border-[#E8DCC4] dark:border-[#4A3B32] hover:border-[#D7C0A0] dark:hover:border-[#5D4037] text-[#4A3B32] dark:text-[#E8DCC4] backdrop-blur-sm transition-all duration-500 font-bold magnetic-hover shadow-lg hover:shadow-[#E8DCC4]/30 dark:hover:shadow-[#4A3B32]/30 relative overflow-hidden"
                >
                  {/* Subtle glow on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <PlayCircle className="w-5 h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10 font-extrabold">Lihat Demo</span>
                </Button>
              </Link>
            </div>

            {/* Hero Visual - Floating Glass Interface */}
            <div className="relative mt-20 w-full max-w-5xl mx-auto perspective-1000">
              <div className="relative bg-white/80 dark:bg-black/40 border border-stone-200 dark:border-white/10 rounded-xl p-2 shadow-2xl backdrop-blur-xl transform rotate-x-12 hover:rotate-x-0 transition-transform duration-1000 ease-out group">
                {/* Browser Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-100 dark:border-white/5 bg-stone-50/50 dark:bg-white/5 rounded-t-lg">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-xs text-stone-400 font-mono">menify.id/demo</div>
                </div>
                
                {/* Content Preview */}
                <div className="relative aspect-video bg-stone-50 dark:bg-slate-950 rounded-b-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-black" />
                  
                  {/* Mock UI Elements */}
                  <div className="absolute top-10 left-10 right-10 bottom-10 grid grid-cols-3 gap-6 opacity-80">
                    <div className="col-span-1 bg-white dark:bg-white/5 rounded-xl border border-stone-200 dark:border-white/5 p-4 space-y-3 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-primary/20" />
                      <div className="h-4 w-2/3 bg-slate-200 dark:bg-white/10 rounded" />
                      <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded" />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="bg-white dark:bg-white/5 rounded-xl border border-stone-200 dark:border-white/5 p-3 flex gap-3 items-center shadow-sm">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-white/10" />
                          <div className="space-y-2 flex-1">
                            <div className="h-3 w-1/2 bg-slate-200 dark:bg-white/10 rounded" />
                            <div className="h-2 w-1/3 bg-slate-100 dark:bg-white/5 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Glow Behind */}
              <div className="absolute -inset-10 bg-primary/20 blur-[100px] -z-10 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee - Glass Style */}
      <section className="border-y border-stone-200 dark:border-white/5 bg-stone-50/50 dark:bg-black/20 backdrop-blur-sm py-10 overflow-hidden">
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-24 items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-24 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                <span className="text-2xl font-bold font-sans text-foreground tracking-widest uppercase">Kopi Kenangan</span>
                <span className="text-2xl font-bold font-sans text-foreground tracking-widest uppercase">Senayan</span>
                <span className="text-2xl font-bold font-sans text-foreground tracking-widest uppercase">Bakmi GM</span>
                <span className="text-2xl font-bold font-sans text-foreground tracking-widest uppercase">Solaria</span>
                <span className="text-2xl font-bold font-sans text-foreground tracking-widest uppercase">Fore Coffee</span>
                <span className="text-2xl font-bold font-sans text-foreground tracking-widest uppercase">Janji Jiwa</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Minimalist Clean Design */}
      <section className="py-10 border-b border-border bg-background relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { number: "2,500+", label: "Mitra Restoran", icon: <Store className="w-6 h-6 text-orange-600 dark:text-orange-500" /> },
              { number: "1M+", label: "Pesanan Terproses", icon: <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-500" /> },
              { number: "4.9/5", label: "Rating Aplikasi", icon: <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-center gap-5 p-4 group hover:bg-accent/50 rounded-2xl transition-colors duration-300">
                {/* Icon Bubble */}
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                {/* Text Content */}
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW! */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Features - Bento Grid */}
      <section id="features" className="py-20 relative">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-6 text-foreground">Fitur <span className="text-gradient-primary">Next-Gen</span></h2>
            <p className="text-stone-600 dark:text-stone-400 text-xl max-w-2xl">
              Teknologi restoran tercanggih, dikemas dalam tampilan yang simpel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 premium-glass rounded-3xl p-10 relative overflow-hidden group animate-slide-in-left">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 text-primary border border-primary/20 magnetic-hover">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Mobile First Experience</h3>
                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
                  Tampilan menu yang didesain khusus untuk kenyamanan pelanggan di smartphone. Animasi halus, loading instan, dan UX kelas dunia.
                </p>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Feature 2 */}
            <div className="premium-glass rounded-3xl p-10 relative overflow-hidden group animate-slide-in-right">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 text-primary border border-primary/20 magnetic-hover">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Lightning Fast</h3>
                <p className="text-stone-600 dark:text-stone-400 text-lg">
                  Dibangun dengan teknologi terbaru untuk performa tanpa lag.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="premium-glass rounded-3xl p-10 relative overflow-hidden group animate-slide-in-left">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-6 text-accent border border-accent/20 magnetic-hover">
                  <QrCode className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Smart QR</h3>
                <p className="text-stone-600 dark:text-stone-400 text-lg">
                  QR code dinamis yang bisa diupdate kapan saja tanpa cetak ulang.
                </p>
              </div>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 premium-glass rounded-3xl p-10 relative overflow-hidden group animate-slide-in-right">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-6 text-accent border border-accent/20 magnetic-hover">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Real-time Analytics</h3>
                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
                  Pantau performa menu, item terlaris, dan jam sibuk secara real-time dari dashboard admin yang powerful.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section - NEW! */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Dipercaya oleh <span className="text-gradient-primary">Restoran Terbaik</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-xl max-w-2xl mx-auto">
              Bergabung dengan ratusan restoran yang telah beralih ke masa depan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Budi Santoso"
              role="Owner"
              restaurant="Kopi Kenangan Senayan"
              content="Sejak pakai Menify, operasional jadi jauh lebih efisien. Pelanggan suka banget karena cepet dan nggak perlu install aplikasi lagi. Omzet naik 30%!"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              delay={0}
            />
            <TestimonialCard 
              name="Sarah Wijaya"
              role="Manager"
              restaurant="Sushi Tei Indonesia"
              content="Fitur QR dinamisnya juara! Ganti harga atau menu sold out tinggal klik di dashboard, langsung update di semua meja. Hemat biaya cetak jutaan per bulan."
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
              delay={200}
            />
            <TestimonialCard 
              name="Michael Tan"
              role="Founder"
              restaurant="Holycow! Steakhouse"
              content="Tampilannya premium banget, cocok sama branding restoran kita. Support tim Menify juga fast response. Best investment tahun ini!"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section - NEW! */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* FAQ Section - NEW! */}
      <FAQSection />

      {/* CTA Section - Glowing Orb */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
        
        
        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter text-foreground mb-8">
            Ready to <span className="text-gradient-primary">Launch?</span>
          </h2>
          <p className="text-xl text-stone-600 dark:text-stone-300 mb-12 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan restoran visioner lainnya. Transformasi bisnis Anda hari ini.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/login">
              <Button 
                size="lg" 
                className="group text-xl px-12 py-8 rounded-full bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#78350F] hover:from-[#92400E] hover:via-[#B45309] hover:to-[#92400E] text-white shadow-[0_0_50px_-10px_rgba(120,53,15,0.6)] hover:shadow-[0_0_80px_-15px_rgba(146,64,14,0.8)] transition-all duration-500 border-2 border-[#92400E]/40 hover:border-[#B45309]/60 font-bold magnetic-hover relative overflow-hidden"
              >
                {/* Metallic shimmer for depth */}
                <span className="absolute inset-0 shimmer opacity-50" />
                
                {/* Glossy shine effect - animated light sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                
                {/* Subtle highlight overlay for 3D effect */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                
                {/* Bottom shadow for depth */}
                <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Content */}
                <span className="relative z-10 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Mulai Sekarang</span>
                <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Footer - Universal Dark Roast Theme */}
      <footer className="border-t border-[#2A201C] bg-[#1A1512] backdrop-blur-xl pt-20 pb-10">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="font-bold text-2xl text-[#E8DCC4]">Menify</span>
              </div>
              <p className="text-[#9C8E85] max-w-xs">
                The future of dining experience.
              </p>
            </div>
            
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[#E8DCC4]">Product</h4>
                <a href="#features" className="text-[#9C8E85] hover:text-primary hover:translate-x-1 transition-all duration-300 active:scale-95 origin-left">Features</a>
                <a href="#pricing" className="text-[#9C8E85] hover:text-primary hover:translate-x-1 transition-all duration-300 active:scale-95 origin-left">Pricing</a>
                <a href="#how-it-works" className="text-[#9C8E85] hover:text-primary hover:translate-x-1 transition-all duration-300 active:scale-95 origin-left">How It Works</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[#E8DCC4]">Company</h4>
                <Link href="/about" className="text-[#9C8E85] hover:text-primary hover:translate-x-1 transition-all duration-300 active:scale-95 origin-left">About</Link>
                <Link href="/blog" className="text-[#9C8E85] hover:text-primary hover:translate-x-1 transition-all duration-300 active:scale-95 origin-left">Blog</Link>
                <Link href="/contact" className="text-[#9C8E85] hover:text-primary hover:translate-x-1 transition-all duration-300 active:scale-95 origin-left">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#2A201C] pt-8 flex justify-between items-center text-sm text-[#7A6E66]">
            <p>© 2025 Menify Inc.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors hover:underline active:text-orange-600">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors hover:underline active:text-orange-600">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
  )
}
