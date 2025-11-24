import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Utensils, 
  QrCode, 
  Settings, 
  CreditCard, 
  LogOut, 
  Menu,
  BarChart3
} from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch restaurant data
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .limit(1)

  const restaurant = restaurants?.[0]

  if (!restaurant) {
    // If user has no restaurant, redirect to onboarding
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-muted/10 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">🍽️</span>
            <span>MenuQR</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">
            Menu Management
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </Button>
          </Link>
          <Link href="/dashboard/menu">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Utensils className="w-4 h-4" />
              Menu Items
            </Button>
          </Link>
          <Link href="/dashboard/categories">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Menu className="w-4 h-4" />
              Categories
            </Button>
          </Link>

          <div className="text-xs font-semibold text-muted-foreground mt-6 mb-2 px-2 uppercase tracking-wider">
            Growth
          </div>
          <Link href="/dashboard/qr-code">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
          </Link>
          <Link href="/dashboard/analytics">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
          </Link>

          <div className="text-xs font-semibold text-muted-foreground mt-6 mb-2 px-2 uppercase tracking-wider">
            Settings
          </div>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="w-4 h-4" />
              Restaurant Info
            </Button>
          </Link>
          <Link href="/dashboard/subscription">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <CreditCard className="w-4 h-4" />
              Subscription
            </Button>
          </Link>
        </div>

        <div className="p-4 border-t bg-muted/20">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{restaurant.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="outline" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
