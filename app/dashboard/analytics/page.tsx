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
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor performa menu digital Anda
        </p>
      </div>

      {restaurant.subscription_tier === 'free' && (
        <Card className="glass border-2 border-warning/30 bg-gradient-to-r from-warning/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">🔒 Analytics Premium</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade ke Pro untuk mendapatkan analytics lengkap, real-time tracking, dan insights mendalam tentang performa menu Anda.
                </p>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  Data di bawah adalah simulasi
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover glass border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Eye className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">{analytics.totalViews}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-success" />
              <p className="text-xs text-success font-medium">
                +{analytics.viewsGrowth}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <Users className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{analytics.uniqueVisitors}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-success" />
              <p className="text-xs text-success font-medium">
                +{analytics.visitorsGrowth}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
            <div className="p-2 bg-success/10 rounded-lg">
              <Clock className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{analytics.avgSessionTime}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-success" />
              <p className="text-xs text-success font-medium">
                +{analytics.sessionGrowth}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="p-2 bg-warning/10 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">68%</div>
            <p className="text-xs text-muted-foreground mt-2">
              View to WhatsApp click
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Views by Day */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Views 7 Hari Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.viewsByDay.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground">{item.views} views</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${(item.views / maxViews) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Items */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" />
              Menu Paling Populer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-warning to-accent rounded-full"
                          style={{ width: `${(item.views / analytics.popularItems[0].views) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
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
        <Card className="glass card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peak Hours</p>
                <p className="text-2xl font-bold">12:00 - 14:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Returning Visitors</p>
                <p className="text-2xl font-bold">42%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp Clicks</p>
                <p className="text-2xl font-bold">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
