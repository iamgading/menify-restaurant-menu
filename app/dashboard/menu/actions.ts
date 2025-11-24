'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const menuItemSchema = z.object({
  name: z.string().min(2),
  price: z.string().transform((val) => parseInt(val, 10)),
  description: z.string().optional(),
  category_id: z.string().uuid(),
  is_available: z.string().optional().transform((val) => val === 'on'),
})

export async function createMenuItem(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, menu_item_limit, subscription_tier')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    return { error: 'Restaurant not found' }
  }

  // Check limits
  const { count } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  if (count !== null && count >= restaurant.menu_item_limit) {
    return { error: 'Limit reached. Upgrade to Pro for unlimited items.' }
  }

  const data = {
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    category_id: formData.get('category_id'),
    is_available: formData.get('is_available'),
  }

  const validated = menuItemSchema.safeParse(data)

  if (!validated.success) {
    return { error: 'Invalid input data' }
  }

  // Handle Image Upload (TODO: Implement Storage)
  // For now, we'll skip image upload or use a placeholder URL if provided
  // const imageFile = formData.get('image') as File

  const { error } = await supabase
    .from('menu_items')
    .insert({
      restaurant_id: restaurant.id,
      ...validated.data,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/menu')
  redirect('/dashboard/menu')
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  // Verify ownership
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return { error: 'Restaurant not found' }

  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)
    .eq('restaurant_id', restaurant.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/menu')
  return { success: true }
}

export async function toggleMenuItemAvailability(id: string, isAvailable: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  // Verify ownership
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return { error: 'Restaurant not found' }

  const { error } = await supabase
    .from('menu_items')
    .update({ is_available: isAvailable })
    .eq('id', id)
    .eq('restaurant_id', restaurant.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/menu')
  revalidatePath('/dashboard')
  return { success: true }
}
