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
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  Crown
} from "lucide-react"
import { RestaurantInfoCard } from "./components/restaurant-info-card"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Card className="max-w-md w-full border-none shadow-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              Session Expired
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Please login again to access your dashboard.
            </p>
            <Link href="/login" className="block">
              <Button className="w-full rounded-xl h-12 font-semibold text-lg shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  // Debug logging
  console.log('=== RESTAURANT QUERY DEBUG ===')
  console.log('User ID:', user.id)
  console.log('User Email:', user.email)
  console.log('Restaurant Data:', restaurant)
  console.log('Restaurant Error:', restaurantError)
  console.log('===============================')

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Setup Diperlukan</h2>
              <p className="text-stone-600 dark:text-stone-400">Restaurant Anda belum di-setup. Ikuti langkah berikut:</p>
            </div>
            
            <div className="bg-white dark:bg-stone-900 rounded-xl p-6 space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Buka Supabase Dashboard</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Login ke dashboard.supabase.com</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Buka SQL Editor</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Klik "SQL Editor" di sidebar kiri</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Jalankan Script</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">Copy script dari file <code className="bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">SIMPLE_FIX.sql</code></p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Ganti email dengan: <code className="bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">{user.email}</code></p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white">Refresh Halaman</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Setelah script berhasil, refresh halaman ini</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>💡 Tips:</strong> Script ini hanya perlu dijalankan sekali. Setelah itu semua fitur akan berfungsi normal.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { count: itemCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  // Get available items count
  const { count: availableCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)
    .eq('is_available', true)

  // Get unavailable items count
  const { count: unavailableCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)
    .eq('is_available', false)

  // Determine Plan (Mock logic for now, replace with actual DB field if available)
  const isPro = restaurant.subscription_tier === 'pro';
  const planName = isPro ? 'Pro Plan' : 'Free Plan';

  return (
    <div className="space-y-8 p-8 min-h-screen bg-stone-50/50 dark:bg-stone-950/50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Dashboard
            </h1>
            <Badge 
              variant="outline" 
              className={`px-3 py-1 rounded-full border-2 font-bold ${
                isPro 
                  ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200' 
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {isPro ? <Crown className="w-3 h-3 mr-1 fill-amber-500 text-amber-600" /> : null}
              {planName}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Welcome back, <span className="font-semibold text-stone-900 dark:text-stone-100">{user.user_metadata.full_name || 'Owner'}</span>! 👋
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/r/${restaurant.slug}`} target="_blank">
            <Button variant="outline" className="rounded-xl h-11 px-5 border-2 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all duration-200">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Menu
            </Button>
          </Link>
          <Link href="/dashboard/menu/new">
            <Button className="rounded-xl h-11 px-6 font-semibold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0">
              <Plus className="w-5 h-5 mr-2" />
              Add Menu
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl hover:bg-white/80 transition-colors duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-orange-600 transition-colors">Total Menu</CardTitle>
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 group-hover:scale-110 transition-transform duration-300">
              <Utensils className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{itemCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Items active
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl hover:bg-white/80 transition-colors duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-blue-600 transition-colors">Categories</CardTitle>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
              <Menu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{categoryCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Active categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl hover:bg-white/80 transition-colors duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-green-600 transition-colors">Available</CardTitle>
            <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{availableCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Ready to order
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl hover:bg-white/80 transition-colors duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-red-600 transition-colors">Sold Out</CardTitle>
            <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 group-hover:scale-110 transition-transform duration-300">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{unavailableCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Out of stock
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-stone-900 to-stone-800 text-white group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-24 h-24" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-stone-300">Plan Status</CardTitle>
            {isPro ? (
               <Crown className="h-5 w-5 text-amber-400" />
            ) : (
               <Zap className="h-5 w-5 text-stone-400" />
            )}
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold mb-1">{planName}</div>
            {isPro ? (
              <p className="text-xs text-amber-300 font-medium">Premium features active</p>
            ) : (
              <Link href="/pricing" className="text-xs text-orange-300 hover:text-orange-200 underline font-medium">
                Upgrade to Pro &rarr;
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <h2 className="text-2xl font-bold mb-6 text-stone-900 dark:text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/menu/new">
            <Card className="cursor-pointer border-none shadow-lg bg-white dark:bg-stone-900 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all duration-300 hover:-translate-y-1 group h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Plus className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white">Add Menu</h3>
                  <p className="text-xs text-muted-foreground mt-1">Create new item</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/menu">
            <Card className="cursor-pointer border-none shadow-lg bg-white dark:bg-stone-900 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 hover:-translate-y-1 group h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Utensils className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white">Manage Menu</h3>
                  <p className="text-xs text-muted-foreground mt-1">Edit existing items</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/qr-code">
            <Card className="cursor-pointer border-none shadow-lg bg-white dark:bg-stone-900 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-300 hover:-translate-y-1 group h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <QrCode className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white">QR Code</h3>
                  <p className="text-xs text-muted-foreground mt-1">Download & Print</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/settings">
            <Card className="cursor-pointer border-none shadow-lg bg-white dark:bg-stone-900 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300 hover:-translate-y-1 group h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white">Settings</h3>
                  <p className="text-xs text-muted-foreground mt-1">Customize shop</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Restaurant Info */}
      <RestaurantInfoCard restaurant={restaurant} />
    </div>
  )
}

