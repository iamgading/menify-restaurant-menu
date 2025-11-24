'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const onboardingSchema = z.object({
  restaurantName: z.string().min(2),
  restaurantSlug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  restaurantPhone: z.string().min(10),
  categoryName: z.string().min(2),
  itemName: z.string().min(2),
  itemPrice: z.string().transform((val) => parseInt(val, 10)),
  itemDescription: z.string().optional(),
})

export async function completeOnboarding(data: any) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const validated = onboardingSchema.safeParse(data)

  if (!validated.success) {
    return { error: 'Invalid input data' }
  }

  const { restaurantName, restaurantSlug, restaurantPhone, categoryName, itemName, itemPrice, itemDescription } = validated.data

  // 1. Create Restaurant
  const { data: restaurant, error: restError } = await supabase
    .from('restaurants')
    .insert({
      name: restaurantName,
      slug: restaurantSlug,
      owner_id: user.id,
      whatsapp: restaurantPhone,
      subscription_tier: 'free',
      subscription_status: 'active',
      subscription_start_date: new Date().toISOString(),
    } as any)
    .select()
    .single() as any

  if (restError) {
    console.error('Error creating restaurant:', restError)
    if (restError.code === '23505') { // Postgres unique violation code
      return { error: 'Link URL (slug) ini sudah digunakan restoran lain. Silakan ganti dengan yang unik.' }
    }
    return { error: 'Gagal membuat restoran: ' + restError.message }
  }

  // 2. Create Category
  const { data: category, error: catError } = await supabase
    .from('categories')
    .insert({
      restaurant_id: restaurant.id,
      name: categoryName,
      sort_order: 1,
    } as any)
    .select()
    .single() as any

  if (catError) {
    console.error('Error creating category:', catError)
    return { error: 'Gagal membuat kategori: ' + catError.message }
  }

  // 3. Create Menu Item
  const { error: itemError } = await supabase
    .from('menu_items')
    .insert({
      restaurant_id: restaurant.id,
      category_id: category.id,
      name: itemName,
      price: itemPrice,
      description: itemDescription,
      is_available: true,
    } as any)

  if (itemError) {
    console.error('Error creating menu item:', itemError)
    return { error: 'Failed to create menu item' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
