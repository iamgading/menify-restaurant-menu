'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Mail, Lock, User, Store, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    restaurantName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create the restaurant record
        // Generate a simple slug from the restaurant name
        const slug = formData.restaurantName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        
        // Add a random suffix to ensure uniqueness if needed, or handle unique constraint error
        // For now, let's try a simple slug. In a real app, we'd check for uniqueness.
        const uniqueSlug = `${slug}-${Math.floor(Math.random() * 10000)}`;

        const { error: restaurantError } = await supabase
          .from('restaurants')
          .insert([
            {
              owner_id: authData.user.id,
              name: formData.restaurantName,
              slug: uniqueSlug,
              theme_color: '#f97316', // Default orange
              is_active: true,
            },
          ]);

        if (restaurantError) {
            // If restaurant creation fails, we might want to warn the user or retry.
            // For now, let's log it and show an error.
            console.error('Error creating restaurant:', JSON.stringify(restaurantError, null, 2));
            toast.error(`Account created, but failed to set up restaurant: ${restaurantError.message || 'Unknown error'}`);
             // Still redirect to dashboard as the user is created
        } else {
             toast.success('Account created successfully!', {
                description: 'Welcome to Menify!',
              });
        }

        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
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
              Start Free Today
            </h1>
            <p className="text-stone-600 dark:text-stone-300">
              Create your account in 30 seconds
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 dark:text-white mb-2">
                    Restaurant Name
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                    <input
                      type="text"
                      required
                      value={formData.restaurantName}
                      onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="My Restaurant"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 dark:text-white mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Minimum 8 characters
                  </p>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-300">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-orange-600 dark:text-orange-400 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-orange-600 dark:text-orange-400 hover:underline">
                    Privacy Policy
                  </Link>
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 h-12 font-bold shadow-lg shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating Account...' : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-stone-600 dark:text-stone-300">
                Already have an account?{' '}
                <Link href="/login" className="text-orange-600 dark:text-orange-400 hover:underline font-semibold">
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
