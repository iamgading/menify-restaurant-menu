import { createClient } from "@/lib/supabase/server"
import CategoriesClient from "./categories-client"

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  const { data: categories } = await supabase
    .from('categories')
    .select('*, menu_items(count)')
    .eq('restaurant_id', restaurant.id)
    .order('name')

  return <CategoriesClient categories={categories || []} restaurantId={restaurant.id} />
}
