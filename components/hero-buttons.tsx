'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, PlayCircle, LayoutDashboard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function HeroButtons() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="h-20" />; // Placeholder
  }

  if (isAuthenticated) {
    return (
      <div className="flex justify-center pt-8">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button 
            size="lg" 
            className="group w-full sm:w-auto text-lg px-12 py-8 rounded-2xl bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#78350F] hover:from-[#92400E] hover:via-[#B45309] hover:to-[#92400E] text-white shadow-[0_0_40px_-12px_rgba(120,53,15,0.6)] hover:shadow-[0_0_60px_-10px_rgba(146,64,14,0.8)] transition-all duration-500 border-2 border-[#92400E]/40 hover:border-[#B45309]/60 font-bold magnetic-hover relative overflow-hidden"
          >
            {/* Metallic shimmer for depth */}
            <span className="absolute inset-0 shimmer opacity-50" />
            
            {/* Glossy shine effect - animated light sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
            
            {/* Subtle highlight overlay for 3D effect */}
            <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            
            {/* Bottom shadow for depth */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            
            {/* Content */}
            <LayoutDashboard className="w-5 h-5 mr-2 relative z-10 group-hover:translate-y-[-2px] transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
            <span className="relative z-10 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Dashboard</span>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 w-full sm:w-auto">
      {/* Button 1: Mulai Gratis - Milk Chocolate/Bronze with Glossy Shine */}
      <Link href="/login" className="w-full sm:w-auto">
        <Button 
          size="lg" 
          className="group w-full sm:w-auto text-lg px-10 py-8 rounded-2xl bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#78350F] hover:from-[#92400E] hover:via-[#B45309] hover:to-[#92400E] text-white shadow-[0_0_40px_-12px_rgba(120,53,15,0.6)] hover:shadow-[0_0_60px_-10px_rgba(146,64,14,0.8)] transition-all duration-500 border-2 border-[#92400E]/40 hover:border-[#B45309]/60 font-bold magnetic-hover relative overflow-hidden"
        >
          {/* Metallic shimmer for depth */}
          <span className="absolute inset-0 shimmer opacity-50" />
          
          {/* Glossy shine effect - animated light sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
          
          {/* Subtle highlight overlay for 3D effect */}
          <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          
          {/* Bottom shadow for depth */}
          <span className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Content */}
          <Rocket className="w-5 h-5 mr-2 relative z-10 group-hover:translate-y-[-2px] transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
          <span className="relative z-10 font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Mulai Gratis</span>
        </Button>
      </Link>

      {/* Button 2: Lihat Demo - Warm Cream/Latte Gradient */}
      <Link href="/r/demo" className="w-full sm:w-auto">
        <Button 
          size="lg" 
          className="group w-full sm:w-auto text-lg px-10 py-8 rounded-2xl bg-gradient-to-r from-[#FFF8F0] via-[#E8DCC4] to-[#FFF8F0] dark:from-[#2C1810] dark:via-[#4A3B32] dark:to-[#2C1810] hover:from-[#E8DCC4] hover:via-[#D7C0A0] hover:to-[#E8DCC4] dark:hover:from-[#4A3B32] dark:hover:via-[#5D4037] dark:hover:to-[#4A3B32] border-2 border-[#E8DCC4] dark:border-[#4A3B32] hover:border-[#D7C0A0] dark:hover:border-[#5D4037] text-[#4A3B32] dark:text-[#E8DCC4] backdrop-blur-sm transition-all duration-500 font-bold magnetic-hover shadow-lg hover:shadow-[#E8DCC4]/30 dark:hover:shadow-[#4A3B32]/30 relative overflow-hidden"
        >
          {/* Subtle glow on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <PlayCircle className="w-5 h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="relative z-10 font-extrabold">Lihat Demo</span>
        </Button>
      </Link>
    </div>
  );
}
