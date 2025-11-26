import { createClient } from '@/lib/supabase/server'

/**
 * Auto-create restaurant and default categories for user if they don't have one
 * This ensures every user has a restaurant to work with
 */
export async function ensureUserHasRestaurant(userId: string, userEmail: string) {
  const supabase = await createClient()
  
  // Check if restaurant already exists
  const { data: existingRestaurant } = await supabase
    .from('restaurants')
    .select('id, menu_item_limit, subscription_tier')
    .eq('owner_id', userId)
    .single()
  
  if (existingRestaurant) {
    return existingRestaurant
  }
  
  console.log('No restaurant found, creating one for user:', userId)
  
  // Generate unique slug from email
  const baseSlug = userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-')
  let slug = baseSlug
  let counter = 0
  
  // Make sure slug is unique
  while (true) {
    const { data: existing } = await supabase
      .from('restaurants')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (!existing) break
    
    counter++
    slug = `${baseSlug}-${counter}`
  }
  
  // Create restaurant
  // @ts-ignore - Supabase type definition issue
  const { data: newRestaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .insert({
      owner_id: userId,
      name: `${userEmail.split('@')[0]}'s Restaurant`,
      slug: slug,
      tagline: 'Cita Rasa Terbaik untuk Anda',
      theme_color: '#B85C38',
      is_active: true,
      subscription_tier: 'free',
      subscription_status: 'active',
      subscription_start_date: new Date().toISOString(),
      menu_item_limit: 20,
      category_limit: 3,
    })
    .select('id, menu_item_limit, subscription_tier')
    .single()
  
  if (restaurantError) {
    console.error('Error creating restaurant:', restaurantError)
    throw new Error('Failed to create restaurant')
  }
  
  if (!newRestaurant) {
    throw new Error('Restaurant created but not returned')
  }
  
  console.log('Restaurant created:', newRestaurant.id)
  
  // Create default categories
  const defaultCategories = [
    { name: 'Makanan Utama', sort_order: 1 },
    { name: 'Minuman', sort_order: 2 },
    { name: 'Snack & Dessert', sort_order: 3 },
  ]
  
  // @ts-ignore - Supabase type definition issue
  const { error: categoriesError } = await supabase
    .from('categories')
    .insert(
      defaultCategories.map(cat => ({
        restaurant_id: newRestaurant.id,
        ...cat,
      }))
    )
  
  if (categoriesError) {
    console.error('Error creating categories:', categoriesError)
    // Don't throw error here, restaurant is already created
  } else {
    console.log('Default categories created')
  }
  
  return newRestaurant
}
