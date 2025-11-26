'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleSignOut}
      className={className || "w-full justify-start gap-3 text-muted-foreground hover:text-destructive"}
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  );
}
