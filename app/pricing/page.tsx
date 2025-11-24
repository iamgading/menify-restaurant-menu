'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, Sparkles, Zap, Crown, TrendingUp, Users, Star, ArrowRight, Info, Shield } from 'lucide-react'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const pricing = {
    free: {
      monthly: 0,
      yearly: 0,
    },
    pro: {
      monthly: 49000,
      yearly: 490000, // 10 months price (save 2 months)
    },
    enterprise: {
      monthly: 149000,
      yearly: 1490000, // 10 months price (save 2 months)
    },
  }

  const calculateSavings = (tier: 'pro' | 'enterprise') => {
    const monthlyCost = pricing[tier].monthly * 12
    const yearlyCost = pricing[tier].yearly
    return monthlyCost - yearlyCost
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden py-20" style={{background: 'var(--gradient-hero)'}}>
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        
        <div className="container relative max-w-5xl mx-auto px-4 text-center">
          {/* Limited Offer Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-white border border-white/30 mb-6">
            <Star className="w-4 h-4 fill-white" />
            <span className="font-semibold text-sm">Promo Launching: Diskon 20% untuk 100 pendaftar pertama</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Harga yang Transparan
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10">
            Mulai gratis, upgrade kapan saja. Tanpa biaya tersembunyi.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm px-1.5 py-1.5 rounded-full border border-white/30">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-primary shadow-md'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 relative ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-primary shadow-md'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Tahunan
              <span className="absolute -top-2 -right-2 bg-success text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                -17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="container max-w-5xl mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-2xl text-center border border-border hover:border-primary/30 transition-all duration-300 group shadow-sm">
            <div className="text-3xl font-bold gradient-text mb-1 group-hover:scale-105 transition-transform">500+</div>
            <div className="text-sm text-muted-foreground">Restoran Aktif</div>
          </div>
          <div className="bg-card p-6 rounded-2xl text-center border border-border hover:border-primary/30 transition-all duration-300 group shadow-sm">
            <div className="text-3xl font-bold gradient-text mb-1 group-hover:scale-105 transition-transform">50K+</div>
            <div className="text-sm text-muted-foreground">QR Scans/Bulan</div>
          </div>
          <div className="bg-card p-6 rounded-2xl text-center border border-border hover:border-primary/30 transition-all duration-300 group shadow-sm">
            <div className="text-3xl font-bold gradient-text mb-1 group-hover:scale-105 transition-transform">4.9/5</div>
            <div className="text-sm text-muted-foreground">Rating Pengguna</div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Free Tier */}
          <div className="glass rounded-2xl border border-border/50 p-7 hover:border-border transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full mb-4">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-xs uppercase tracking-wide">Starter</span>
              </div>
              <h3 className="text-2xl font-bold mb-1.5">Gratis</h3>
              <p className="text-sm text-muted-foreground">Perfect untuk mulai & testing</p>
            </div>

            <div className="mb-7">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold">Rp 0</span>
              </div>
              <div className="text-sm text-muted-foreground">Selamanya gratis</div>
            </div>

            <Link href="/auth/signup">
              <Button className="w-full mb-7 hover:scale-[1.02] transition-transform" size="lg" variant="outline">
                Mulai Gratis
              </Button>
            </Link>

            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm">1 restoran</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm">Maksimal 20 menu items</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm">3 kategori</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm">QR code basic</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm">WhatsApp integration</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm">Mobile responsive</span>
              </div>
              <div className="flex items-start gap-2.5 opacity-40">
                <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Menify watermark</span>
              </div>
              <div className="flex items-start gap-2.5 opacity-40">
                <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Analytics</span>
              </div>
            </div>
          </div>

          {/* Pro Tier - POPULAR */}
          <div className="glass rounded-2xl border-2 p-7 relative shadow-xl hover:shadow-2xl transition-all duration-300" style={{borderColor: 'var(--primary)'}}>
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1.5 rounded-full text-white font-bold text-xs shadow-md" style={{background: 'var(--gradient-primary)'}}>
                ⭐ PALING POPULER
              </div>
            </div>

            <div className="mb-6 mt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{background: 'var(--gradient-primary)'}}>
                <Crown className="w-3.5 h-3.5 text-white" />
                <span className="font-bold text-xs uppercase tracking-wide text-white">Pro</span>
              </div>
              <h3 className="text-2xl font-bold mb-1.5">Pro</h3>
              <p className="text-sm text-muted-foreground">Untuk restoran profesional</p>
            </div>

            <div className="mb-7">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold gradient-text">
                  {billingPeriod === 'monthly' 
                    ? 'Rp 49k' 
                    : 'Rp 41k'}
                </span>
                {billingPeriod === 'yearly' && (
                  <span className="text-base text-muted-foreground line-through">Rp 49k</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                per bulan {billingPeriod === 'yearly' && '(dibayar tahunan)'}
              </div>
              {billingPeriod === 'yearly' && (
                <div className="inline-flex items-center gap-1.5 bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">
                    Hemat Rp {calculateSavings('pro').toLocaleString('id-ID')}/tahun
                  </span>
                </div>
              )}
            </div>

            <Link href="/auth/signup?tier=pro">
              <Button className="w-full mb-7 group hover:scale-[1.02] transition-all shadow-md" size="lg" style={{background: 'var(--gradient-primary)'}}>
                <span>Coba 14 Hari Gratis</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Semua fitur Free Plan
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Unlimited menu items</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Unlimited kategori</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Hapus watermark Menify</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Custom logo & branding</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">QR code custom design</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Analytics & insights</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Menu templates</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Priority support</span>
              </div>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="glass rounded-2xl border border-border/50 p-7 hover:border-border transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full mb-4">
                <Crown className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-xs uppercase tracking-wide">Enterprise</span>
              </div>
              <h3 className="text-2xl font-bold mb-1.5">Enterprise</h3>
              <p className="text-sm text-muted-foreground">Untuk chain & franchise</p>
            </div>

            <div className="mb-7">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">
                  {billingPeriod === 'monthly' 
                    ? 'Rp 149k' 
                    : 'Rp 124k'}
                </span>
                {billingPeriod === 'yearly' && (
                  <span className="text-base text-muted-foreground line-through">Rp 149k</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                per bulan {billingPeriod === 'yearly' && '(dibayar tahunan)'}
              </div>
              {billingPeriod === 'yearly' && (
                <div className="inline-flex items-center gap-1.5 bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">
                    Hemat Rp {calculateSavings('enterprise').toLocaleString('id-ID')}/tahun
                  </span>
                </div>
              )}
            </div>

            <Link href="/auth/signup?tier=enterprise">
              <Button className="w-full mb-7 group hover:scale-[1.02] transition-transform" size="lg" variant="outline">
                <span>Hubungi Sales</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
                <Users className="w-3.5 h-3.5" />
                Semua fitur Pro Plan
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Multiple locations (unlimited)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Custom domain</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">White-label option</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">API access</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Team management</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Advanced integrations</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Dedicated account manager</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Custom development</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container max-w-5xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Perbandingan Fitur Lengkap</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden border border-border/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Fitur</th>
                  <th className="text-center p-4 font-semibold">Free</th>
                  <th className="text-center p-4 font-semibold bg-primary/5">Pro</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">Jumlah Restoran</td>
                  <td className="text-center p-4">1</td>
                  <td className="text-center p-4 bg-primary/5">1</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">Menu Items</td>
                  <td className="text-center p-4">20</td>
                  <td className="text-center p-4 bg-primary/5">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">Kategori</td>
                  <td className="text-center p-4">3</td>
                  <td className="text-center p-4 bg-primary/5">Unlimited</td>
                  <td className="text-center p-4">Unlimited</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">QR Code</td>
                  <td className="text-center p-4"><Check className="w-4 h-4 text-success mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5"><Check className="w-4 h-4 text-success mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-4 h-4 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">Custom Branding</td>
                  <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground/50 mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5"><Check className="w-4 h-4 text-success mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-4 h-4 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">Analytics</td>
                  <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground/50 mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5"><Check className="w-4 h-4 text-success mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-4 h-4 text-success mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">API Access</td>
                  <td className="text-center p-4"><X className="w-4 h-4 text-muted-foreground/50 mx-auto" /></td>
                  <td className="text-center p-4 bg-primary/5"><X className="w-4 h-4 text-muted-foreground/50 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-4 h-4 text-success mx-auto" /></td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">Support</td>
                  <td className="text-center p-4 text-muted-foreground">Email</td>
                  <td className="text-center p-4 bg-primary/5 font-medium">Priority</td>
                  <td className="text-center p-4 font-medium">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container max-w-4xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Pertanyaan Umum</h2>
          <p className="text-muted-foreground">
            Punya pertanyaan? Kami punya jawabannya
          </p>
        </div>
        <div className="space-y-3">
          <details className="glass p-5 rounded-xl border border-border/50 group cursor-pointer hover:border-border transition-all">
            <summary className="font-semibold text-base flex items-center justify-between">
              Apakah bisa upgrade/downgrade kapan saja?
              <Info className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Ya! Kamu bisa upgrade atau downgrade tier kapan saja. Perubahan akan berlaku di periode billing berikutnya. Tidak ada penalti atau biaya tambahan.
            </p>
          </details>
          <details className="glass p-5 rounded-xl border border-border/50 group cursor-pointer hover:border-border transition-all">
            <summary className="font-semibold text-base flex items-center justify-between">
              Bagaimana cara pembayaran?
              <Info className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Kami menerima pembayaran via transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, Dana, ShopeePay), dan kartu kredit melalui payment gateway Midtrans yang aman.
            </p>
          </details>
          <details className="glass p-5 rounded-xl border border-border/50 group cursor-pointer hover:border-border transition-all">
            <summary className="font-semibold text-base flex items-center justify-between">
              Apakah ada biaya setup atau biaya tersembunyi?
              <Info className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Tidak ada! Semua tier tidak ada biaya setup, biaya aktivasi, atau biaya tersembunyi lainnya. Harga yang tertera adalah harga final yang kamu bayar.
            </p>
          </details>
          <details className="glass p-5 rounded-xl border border-border/50 group cursor-pointer hover:border-border transition-all">
            <summary className="font-semibold text-base flex items-center justify-between">
              Bagaimana jika saya cancel subscription?
              <Info className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Kamu tetap bisa akses semua fitur Pro/Enterprise sampai akhir periode billing yang sudah dibayar. Setelah itu, akun akan otomatis downgrade ke Free tier. Data kamu tetap aman dan tidak akan hilang.
            </p>
          </details>
          <details className="glass p-5 rounded-xl border border-border/50 group cursor-pointer hover:border-border transition-all">
            <summary className="font-semibold text-base flex items-center justify-between">
              Apakah trial 14 hari benar-benar gratis?
              <Info className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Ya, 100% gratis! Kamu bisa mencoba semua fitur Pro selama 14 hari tanpa perlu memasukkan kartu kredit. Setelah trial berakhir, kamu bisa pilih untuk upgrade atau tetap di Free tier.
            </p>
          </details>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container max-w-4xl mx-auto px-4 pb-20">
        <div className="glass rounded-2xl p-8 border border-border/50">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-success" />
              <span>Pembayaran Aman</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-5 h-5 text-success" />
              <span>Tanpa Kontrak</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-5 h-5 text-success" />
              <span>14 Hari Trial</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-5 h-5 text-success" />
              <span>500+ Pengguna</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container max-w-4xl mx-auto px-4 pb-24">
        <div className="relative overflow-hidden p-12 rounded-2xl text-center" style={{background: 'var(--gradient-hero)'}}>
          <div className="absolute inset-0 pattern-dots opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/30 mb-5">
              <Star className="w-4 h-4 fill-white" />
              <span className="font-semibold text-sm">Join 500+ restoran yang sudah go digital</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Transform Bisnis Anda?
            </h2>
            <p className="text-base text-white/85 mb-7 max-w-xl mx-auto">
              Setup dalam 5 menit. Tidak perlu kartu kredit untuk memulai.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 py-6 bg-white text-primary hover:bg-white/95 shadow-lg font-bold group hover:scale-[1.02] transition-all">
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>Mulai Gratis Sekarang</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/r/demo">
                <Button size="lg" variant="outline" className="px-8 py-6 border-2 border-white/30 text-white hover:bg-white/10 font-semibold backdrop-blur-sm hover:scale-[1.02] transition-all">
                  Lihat Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
