import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Check, 
  X, 
  Sparkles, 
  Zap,
  Crown,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

export default async function SubscriptionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  const isPro = restaurant.subscription_tier === 'pro'

  return (
    <div className="space-y-8 fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Subscription Plan
        </h1>
        <p className="text-lg text-muted-foreground">
          Pilih plan yang sesuai dengan kebutuhan bisnis Anda
        </p>
      </div>

      {/* Current Plan Badge */}
      <div className="flex justify-center">
        <Badge 
          variant={isPro ? "default" : "secondary"}
          className="text-lg px-6 py-3"
        >
          {isPro ? '⭐ Anda sedang menggunakan Pro Plan' : '🆓 Anda sedang menggunakan Free Plan'}
        </Badge>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card className={`glass ${!isPro ? 'border-2 border-primary' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              {!isPro && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Current Plan
                </Badge>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">Rp 0</span>
              <span className="text-muted-foreground">/bulan</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span>Maksimal 20 menu items</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span>Menu digital dengan QR Code</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span>Kategori unlimited</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span>WhatsApp integration</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Custom branding</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Analytics dashboard</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Priority support</span>
              </div>
            </div>

            {!isPro && (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className={`glass relative overflow-hidden ${isPro ? 'border-2 border-primary' : 'border-2 border-primary/30'}`}>
          {/* Popular Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-lg">
              <Sparkles className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>

          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Crown className="w-6 h-6 text-primary" />
                Pro Plan
              </CardTitle>
              {isPro && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Current Plan
                </Badge>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold gradient-text">Rp 49.000</span>
              <span className="text-muted-foreground">/bulan</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">Unlimited menu items</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">Menu digital dengan QR Code</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">Kategori unlimited</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">WhatsApp integration</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">Custom branding & logo</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">Analytics dashboard lengkap</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success mt-0.5" />
                <span className="font-medium">Priority support 24/7</span>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-warning mt-0.5" />
                <span className="font-medium text-warning">Upload foto menu</span>
              </div>
            </div>

            {isPro ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Link href="/pricing">
                <Button 
                  className="w-full btn-magnetic pulse-glow" 
                  style={{background: 'var(--gradient-primary)'}}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Upgrade Sekarang
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <Card className="glass border-primary/20 max-w-5xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            Kenapa Upgrade ke Pro? 🚀
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Unlimited Menu</h4>
              <p className="text-sm text-muted-foreground">
                Tambahkan menu sebanyak yang Anda mau tanpa batasan
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-warning rounded-2xl flex items-center justify-center text-white shadow-lg">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Analytics Lengkap</h4>
              <p className="text-sm text-muted-foreground">
                Pantau performa menu dan perilaku pelanggan secara real-time
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-success to-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Crown className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Priority Support</h4>
              <p className="text-sm text-muted-foreground">
                Dapatkan bantuan prioritas 24/7 dari tim kami
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="glass max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Bagaimana cara upgrade?</h4>
            <p className="text-sm text-muted-foreground">
              Klik tombol "Upgrade Sekarang" dan ikuti instruksi pembayaran. Akun Anda akan langsung di-upgrade setelah pembayaran berhasil.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Apakah bisa downgrade?</h4>
            <p className="text-sm text-muted-foreground">
              Ya, Anda bisa downgrade kapan saja. Namun fitur Pro akan hilang dan menu akan dibatasi sesuai plan Free.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Metode pembayaran apa yang tersedia?</h4>
            <p className="text-sm text-muted-foreground">
              Kami menerima transfer bank, e-wallet (GoPay, OVO, Dana), dan kartu kredit/debit.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
