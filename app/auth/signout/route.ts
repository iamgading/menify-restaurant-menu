import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // Redirect to login page after sign‑out
  return NextResponse.redirect(new URL('/auth/login', req.url));
}
