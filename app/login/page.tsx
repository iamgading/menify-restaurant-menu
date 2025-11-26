'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Logged in successfully!', {
        description: 'Redirecting to dashboard...',
      });

      // Force redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-b from-orange-50/30 to-transparent dark:from-orange-950/10">
        <div className="container max-w-md mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-4 text-stone-900 dark:text-white">
              Welcome Back!
            </h1>
            <p className="text-stone-600 dark:text-stone-300">
              Login to access your dashboard
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-900 dark:text-white mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 dark:text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-stone-300 dark:border-stone-600 text-orange-500 focus:ring-orange-500" />
                    <span className="text-stone-600 dark:text-stone-300">Remember me</span>
                  </label>
                  <Link href="#" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 h-12 font-bold shadow-lg shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Logging in...' : (
                    <>
                      Login
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-stone-600 dark:text-stone-300">
                Don't have an account?{' '}
                <Link href="/signup" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
