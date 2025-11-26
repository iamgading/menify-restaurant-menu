'use client';

import Link from "next/link"
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
import { SignOutButton } from "@/components/sign-out-button"
import { usePathname } from "next/navigation"

interface DashboardSidebarProps {
  user: any;
  restaurant: any;
}

export function DashboardSidebar({ user, restaurant }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-orange-50 via-orange-50/80 to-amber-50/60 backdrop-blur-xl border-r border-orange-200/50 hidden md:flex flex-col fixed h-full z-20 shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-orange-200/50 flex items-center justify-between bg-white/50">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Logo />
          <span className="font-bold text-2xl text-stone-900 font-heading tracking-tight">Menify</span>
        </Link>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-bold text-orange-800/60 mb-3 px-3 uppercase tracking-wider">
          Menu Management
        </div>
        <Link href="/dashboard">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard') && pathname === '/dashboard'
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Button>
        </Link>
        <Link href="/dashboard/menu">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard/menu')
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Utensils className="w-4 h-4" />
            Menu Items
          </Button>
        </Link>
        <Link href="/dashboard/categories">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard/categories')
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Menu className="w-4 h-4" />
            Categories
          </Button>
        </Link>

        <div className="text-xs font-bold text-orange-800/60 mt-8 mb-3 px-3 uppercase tracking-wider">
          Growth
        </div>
        <Link href="/dashboard/qr-code">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard/qr-code')
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <QrCode className="w-4 h-4" />
            QR Code
          </Button>
        </Link>
        <Link href="/dashboard/analytics">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard/analytics')
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </Button>
        </Link>

        <div className="text-xs font-bold text-orange-800/60 mt-8 mb-3 px-3 uppercase tracking-wider">
          Settings
        </div>
        <Link href="/dashboard/settings">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard/settings')
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Restaurant Info
          </Button>
        </Link>
        <Link href="/dashboard/subscription">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-3 font-medium transition-all duration-200 ${
              isActive('/dashboard/subscription')
                ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50'
                : 'text-stone-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Subscription
          </Button>
        </Link>
      </div>

      {/* Profile & Sign Out */}
      <div className="p-4 border-t border-orange-200/50 bg-orange-50/50 space-y-2">
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start gap-3 text-stone-700 hover:text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-bold text-stone-900 truncate">{restaurant.name}</p>
              <p className="text-xs text-stone-600 truncate">{user.email}</p>
            </div>
          </Button>
        </Link>
        <SignOutButton />
      </div>
    </aside>
  );
}

