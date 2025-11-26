'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/logo';
import { createClient } from '@/lib/supabase/client';

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: restaurant } = await supabase
          .from('restaurants')
          .select('name')
          .eq('owner_id', authUser.id)
          .single();
        
        setIsAuthenticated(true);
        setUser({
          name: restaurant?.name || 'User',
          email: authUser.email || ''
        });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-950 shadow-md dark:shadow-stone-900/50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
            <span className="font-bold text-2xl text-stone-900 dark:text-white">Menify</span>
          </Link>

          {/* Right Side - Auth Buttons + Mode Toggle */}
          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {!isAuthenticated ? (
                  <>
                    {/* Login Button */}
                    <Link href="/login">
                      <Button 
                        variant="ghost" 
                        className="rounded-xl font-semibold bg-[#FFF8F0] dark:bg-[#2C1810] hover:bg-[#E8DCC4] dark:hover:bg-[#4A3B32] text-[#4A3B32] dark:text-[#E8DCC4] border-2 border-[#E8DCC4] dark:border-[#4A3B32] hover:border-[#D7C0A0] dark:hover:border-[#5D4037] transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>

                    {/* Sign Up Button */}
                    <Link href="/signup">
                      <Button 
                        className="rounded-xl bg-gradient-to-r from-[#92400E] via-[#B45309] to-[#92400E] hover:from-[#B45309] hover:via-[#D97706] hover:to-[#B45309] text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#B45309]/40 hover:border-[#D97706]/60 font-bold"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* User Profile */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                        {user?.name.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm font-semibold text-stone-900 dark:text-white hidden sm:block">{user?.name}</span>
                    </div>

                    {/* Logout Button */}
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="rounded-xl font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Mode Toggle */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
