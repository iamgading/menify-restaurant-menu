'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, Utensils, QrCode, Settings, CreditCard, LogOut, BarChart3 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { SignOutButton } from '@/components/sign-out-button';

interface MobileSidebarProps {
  user: any;
  restaurant: any;
}

export function MobileSidebar({ user, restaurant }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button - Top Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-lg hover:bg-orange-50 dark:hover:bg-stone-800 transition-colors"
      >
        <Menu className="w-6 h-6 text-stone-900 dark:text-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-80 bg-orange-50/95 dark:bg-stone-900/95 backdrop-blur-xl border-l border-orange-100 dark:border-stone-800 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-orange-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-6 h-6 text-stone-900 dark:text-white" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-orange-100 dark:border-stone-800">
          <Link href="/dashboard" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <Logo />
            <span className="font-bold text-2xl text-stone-900 dark:text-white">Menify</span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-bold text-orange-900/50 dark:text-orange-100/50 mb-3 px-3 uppercase tracking-wider">
            Menu Management
          </div>
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </Button>
          </Link>
          <Link href="/dashboard/menu" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <Utensils className="w-4 h-4" />
              Menu Items
            </Button>
          </Link>
          <Link href="/dashboard/categories" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <Menu className="w-4 h-4" />
              Categories
            </Button>
          </Link>

          <div className="text-xs font-bold text-orange-900/50 dark:text-orange-100/50 mt-8 mb-3 px-3 uppercase tracking-wider">
            Growth
          </div>
          <Link href="/dashboard/qr-code" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
          </Link>
          <Link href="/dashboard/analytics" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
          </Link>

          <div className="text-xs font-bold text-orange-900/50 dark:text-orange-100/50 mt-8 mb-3 px-3 uppercase tracking-wider">
            Settings
          </div>
          <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <Settings className="w-4 h-4" />
              Restaurant Info
            </Button>
          </Link>
          <Link href="/dashboard/subscription" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <CreditCard className="w-4 h-4" />
              Subscription
            </Button>
          </Link>
        </div>

        {/* Profile & Sign Out */}
        <div className="p-4 border-t border-orange-100 dark:border-stone-800 bg-orange-50/50 dark:bg-stone-900/50 space-y-2">
          <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-900/20 font-medium transition-all duration-200">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-sm shadow-sm">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">{restaurant.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </Button>
          </Link>
          <SignOutButton className="w-full justify-start gap-3 text-stone-500 hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/20 border-orange-200 dark:border-stone-800" />
        </div>
      </aside>
    </>
  );
}
