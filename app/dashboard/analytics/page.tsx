import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Eye, 
  Users, 
  ShoppingCart, 
  Clock,
  Star,
  BarChart3,
  Calendar
} from "lucide-react"

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  // Mock analytics data (will be replaced with real data later)
  const analytics = {
    totalViews: Math.floor(Math.random() * 1000) + 500,
    viewsGrowth: Math.floor(Math.random() * 50) + 10,
    uniqueVisitors: Math.floor(Math.random() * 500) + 200,
    visitorsGrowth: Math.floor(Math.random() * 40) + 5,
    avgSessionTime: '2m 34s',
    sessionGrowth: 12,
    popularItems: [
      { name: 'Nasi Goreng Special', views: 156 },
      { name: 'Es Teh Manis', views: 142 },
      { name: 'Ayam Bakar', views: 128 },
      { name: 'Mie Goreng', views: 98 },
      { name: 'Jus Alpukat', views: 87 },
    ],
    viewsByDay: [
      { day: 'Sen', views: 45 },
      { day: 'Sel', views: 52 },
      { day: 'Rab', views: 48 },
      { day: 'Kam', views: 61 },
      { day: 'Jum', views: 73 },
      { day: 'Sab', views: 89 },
      { day: 'Min', views: 95 },
    ]
  }

  const maxViews = Math.max(...analytics.viewsByDay.map(d => d.views))

  return (
    <div className="space-y-8 p-8 min-h-screen bg-stone-50/50 dark:bg-stone-950/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Monitor performa menu digital Anda
        </p>
      </div>

      {restaurant.subscription_tier === 'free' && (
        <Card className="border-none shadow-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 text-stone-900 dark:text-white">🔒 Analytics Premium</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Upgrade ke Pro untuk mendapatkan analytics lengkap, real-time tracking, dan insights mendalam tentang performa menu Anda.
                </p>
                <Badge variant="outline" className="bg-orange-100/50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800">
                  Data di bawah adalah simulasi
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{analytics.totalViews}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <p className="text-xs text-green-600 dark:text-green-400 font-bold">
                +{analytics.viewsGrowth}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{analytics.uniqueVisitors}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <p className="text-xs text-green-600 dark:text-green-400 font-bold">
                +{analytics.visitorsGrowth}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session Time</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">{analytics.avgSessionTime}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <p className="text-xs text-green-600 dark:text-green-400 font-bold">
                +{analytics.sessionGrowth}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900 dark:text-white">68%</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              View to WhatsApp click
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Views by Day */}
        <Card className="border-none shadow-lg bg-white dark:bg-stone-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-white">
              <Calendar className="w-5 h-5 text-orange-500" />
              Views 7 Hari Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.viewsByDay.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-stone-700 dark:text-stone-300">{item.day}</span>
                    <span className="text-muted-foreground font-medium">{item.views} views</span>
                  </div>
                  <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(item.views / maxViews) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Items */}
        <Card className="border-none shadow-lg bg-white dark:bg-stone-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-white">
              <Star className="w-5 h-5 text-amber-500" />
              Menu Paling Populer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(item.views / analytics.popularItems[0].views) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                        {item.views} views
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Peak Hours</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">12:00 - 14:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Returning Visitors</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">42%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">WhatsApp Clicks</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-white">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
