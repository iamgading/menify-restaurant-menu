import { createClient } from "@/lib/supabase/server"
import MenuListClient from "./menu-list-client"

export default async function MenuListPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  console.log('=== MENU PAGE RESTAURANT DEBUG ===')
  console.log('User ID:', user.id)
  console.log('Restaurant:', restaurant)
  console.log('Error:', restaurantError)
  console.log('===================================')

  // FORCE BYPASS: Jika tidak ada restaurant, jangan error.
  // Kita akan buat restaurant-nya nanti saat user create menu.
  // Sekarang tampilkan saja list kosong.
  
  let menuItems: any[] = []
  let categories: any[] = []
  let restaurantId = null

  if (restaurant) {
    restaurantId = restaurant.id
    
    const { data: items } = await supabase
      .from('menu_items')
      .select(`*, categories (name)`)
      .eq('restaurant_id', restaurant.id)
      .order('created_at', { ascending: false })
      
    menuItems = items || []

    const { data: cats } = await supabase
      .from('categories')
      .select('id, name')
      .eq('restaurant_id', restaurant.id)
      .order('name')
      
    categories = cats || []
  }

  return <MenuListClient menuItems={menuItems} categories={categories} />
}
