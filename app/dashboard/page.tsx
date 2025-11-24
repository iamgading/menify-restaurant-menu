import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Utensils, 
  Menu, 
  Eye, 
  Plus, 
  QrCode, 
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  // Fetch counts
  const { count: itemCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  const { count: availableCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)
    .eq('is_available', true)

  const { count: unavailableCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)
    .eq('is_available', false)

  // Get recent menu items
  const { data: recentItems } = await supabase
    .from('menu_items')
    .select('name, price, created_at, is_available')
    .eq('restaurant_id', restaurant.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Mock views for now (will implement analytics later)
  const viewsCount = Math.floor(Math.random() * 500) + 100
  const viewsGrowth = Math.floor(Math.random() * 30) + 5

  const usagePercentage = restaurant.subscription_tier === 'free' 
    ? Math.round((itemCount || 0) / restaurant.menu_item_limit * 100)
    : 0

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Selamat datang kembali, <span className="font-semibold text-foreground">{user.user_metadata.full_name || 'Owner'}</span>! 👋
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/r/${restaurant.slug}`} target="_blank">
            <Button variant="outline" className="gap-2 transition-smooth hover:scale-105">
              <ExternalLink className="w-4 h-4" />
              Lihat Menu Live
            </Button>
          </Link>
          <Link href="/dashboard/menu/new">
            <Button className="gap-2 btn-magnetic pulse-glow" style={{background: 'var(--gradient-primary)'}}>
              <Plus className="w-4 h-4" />
              Tambah Menu
            </Button>
          </Link>
        </div>
      </div>

      {/* Subscription Banner (if Free) */}
      {restaurant.subscription_tier === 'free' && (
        <div className="glass rounded-2xl p-6 border-2 border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-warning/5 pattern-dots"></div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg float">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">🚀 Upgrade ke Pro untuk Fitur Lebih Lengkap!</h3>
                <p className="text-muted-foreground">
                  Dapatkan unlimited menu, custom branding, analytics lengkap, dan prioritas support.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="badge-glow">
                    {itemCount}/{restaurant.menu_item_limit} Menu Used ({usagePercentage}%)
                  </Badge>
                </div>
              </div>
            </div>
            <Link href="/pricing">
              <Button size="lg" className="whitespace-nowrap btn-magnetic" style={{background: 'var(--gradient-primary)'}}>
                Upgrade Sekarang - Rp 49k/bulan
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover glass border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Menu</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Utensils className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{itemCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {restaurant.subscription_tier === 'free' 
                ? `${itemCount}/${restaurant.menu_item_limit} items` 
                : 'Unlimited items'}
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${restaurant.subscription_tier === 'free' ? usagePercentage : 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategori</CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <Menu className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{categoryCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active categories
            </p>
            <Link href="/dashboard/categories" className="inline-block mt-3">
              <Button variant="link" size="sm" className="p-0 h-auto text-accent">
                Kelola Kategori →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="card-hover glass border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Tersedia</CardTitle>
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{availableCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Stok ready
            </p>
            {unavailableCount ? (
              <Badge variant="destructive" className="mt-3">
                {unavailableCount} menu habis
              </Badge>
            ) : null}
          </CardContent>
        </Card>

        <Card className="card-hover glass border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <div className="p-2 bg-warning/10 rounded-lg">
              <Eye className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{viewsCount}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-success" />
              <p className="text-xs text-success font-medium">
                +{viewsGrowth}% dari bulan lalu
              </p>
            </div>
            <Link href="/dashboard/analytics" className="inline-block mt-3">
              <Button variant="link" size="sm" className="p-0 h-auto text-warning">
                Lihat Analytics →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">⚡ Aksi Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/menu/new">
              <Card className="card-hover cursor-pointer h-full border-2 border-dashed border-primary/30 hover:border-primary">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-2xl text-white shadow-lg">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Tambah Menu</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/menu">
              <Card className="card-hover cursor-pointer h-full hover:border-accent/50">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="p-4 bg-accent/10 rounded-2xl text-accent">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Kelola Menu</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/qr-code">
              <Card className="card-hover cursor-pointer h-full hover:border-success/50">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="p-4 bg-success/10 rounded-2xl text-success">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Download QR</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/settings">
              <Card className="card-hover cursor-pointer h-full hover:border-warning/50">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="p-4 bg-warning/10 rounded-2xl text-warning">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">Settings</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🕐 Menu Terbaru</h2>
          <Card className="glass">
            <CardContent className="p-4 space-y-3">
              {recentItems && recentItems.length > 0 ? (
                recentItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="ml-2">
                      {item.is_available ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Ready
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          <XCircle className="w-3 h-3 mr-1" />
                          Habis
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Belum ada menu</p>
                  <Link href="/dashboard/menu/new">
                    <Button variant="link" size="sm" className="mt-2">
                      Tambah menu pertama →
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Restaurant Info Card */}
      <Card className="glass border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Utensils className="w-5 h-5 text-primary" />
            </div>
            Info Restoran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
              <p className="text-muted-foreground mb-4">{restaurant.tagline}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {restaurant.subscription_tier === 'free' ? '🆓 Free Plan' : '⭐ Pro Plan'}
                  </Badge>
                </div>
                <p><span className="font-medium">WhatsApp:</span> {restaurant.whatsapp_number}</p>
                <p><span className="font-medium">Slug:</span> /r/{restaurant.slug}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Link Menu Publik:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm truncate">
                    {typeof window !== 'undefined' ? window.location.origin : ''}/r/{restaurant.slug}
                  </code>
                  <Link href={`/r/${restaurant.slug}`} target="_blank">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <Link href="/dashboard/settings" className="mt-4">
                <Button variant="outline" className="w-full">
                  Edit Info Restoran
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
