import { createClient } from "@/lib/supabase/server"
import MenuListClient from "./menu-list-client"

export default async function MenuListPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  const { data: menuItems } = await supabase
    .from('menu_items')
    .select(`
      *,
      categories (name)
    `)
    .eq('restaurant_id', restaurant.id)
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .eq('restaurant_id', restaurant.id)
    .order('name')

  return <MenuListClient menuItems={menuItems || []} categories={categories || []} />
}
