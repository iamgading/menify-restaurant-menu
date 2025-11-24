'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(2, 'Nama kategori minimal 2 karakter'),
})

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return { error: 'Restaurant not found' }

  const data = {
    name: formData.get('name') as string,
  }

  const validated = categorySchema.safeParse(data)

  if (!validated.success) {
    return { error: validated.error.errors[0].message }
  }

  // Check if category already exists
  const { data: existing } = await supabase
    .from('categories')
    .select('id')
    .eq('restaurant_id', restaurant.id)
    .eq('name', validated.data.name)
    .single()

  if (existing) {
    return { error: 'Kategori dengan nama ini sudah ada' }
  }

  const { error } = await supabase
    .from('categories')
    .insert({
      restaurant_id: restaurant.id,
      ...validated.data,
    })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard/menu')
  return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return { error: 'Restaurant not found' }

  const data = {
    name: formData.get('name') as string,
  }

  const validated = categorySchema.safeParse(data)

  if (!validated.success) {
    return { error: validated.error.errors[0].message }
  }

  const { error } = await supabase
    .from('categories')
    .update(validated.data)
    .eq('id', id)
    .eq('restaurant_id', restaurant.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard/menu')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return { error: 'Restaurant not found' }

  // Check if category has menu items
  const { count } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id)

  if (count && count > 0) {
    return { error: 'Tidak bisa menghapus kategori yang masih memiliki menu' }
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('restaurant_id', restaurant.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard/menu')
  return { success: true }
}
