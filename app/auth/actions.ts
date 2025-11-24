'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(2),
  phone: z.string().min(10),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function signup(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
    phone: formData.get('phone'),
  }

  const validated = signupSchema.safeParse(data)

  if (!validated.success) {
    return { error: 'Invalid input data' }
  }

  const { error: authError, data: authData } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        full_name: validated.data.full_name,
        phone: validated.data.phone,
      },
    },
  })

  if (authError) {
    console.error('Auth error:', authError)
    return { error: authError.message }
  }

  // Check if session is missing (implies email confirmation is ON)
  if (authData.user && !authData.session) {
    return { 
      error: 'Please check your email for a confirmation link. Or disable "Confirm email" in Supabase Dashboard > Authentication > Providers > Email.' 
    }
  }

  if (authData.user) {
    // Insert into public.users table
    const { error: dbError } = await supabase.from('users').insert({
      id: authData.user.id,
      email: validated.data.email,
      full_name: validated.data.full_name,
      phone: validated.data.phone,
      role: 'owner',
    } as any)

    if (dbError) {
      console.error('Error creating user record:', dbError)
      // Continue anyway as auth user is created
    }
  }

  revalidatePath('/', 'layout')
  redirect('/onboarding')
}

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validated = loginSchema.safeParse(data)

  if (!validated.success) {
    return { error: 'Invalid input data' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
