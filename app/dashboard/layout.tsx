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
import { Logo } from "@/components/logo"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { SignOutButton } from "@/components/sign-out-button"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

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
    <div className="min-h-screen bg-muted/10 flex light">
      {/* Mobile Sidebar */}
      <MobileSidebar user={user} restaurant={restaurant} />
      
      {/* Desktop Sidebar */}
      <DashboardSidebar user={user} restaurant={restaurant} />


      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
