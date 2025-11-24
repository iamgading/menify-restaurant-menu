import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MenuPageClient } from '@/components/customer/menu-page-client'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, tagline')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!restaurant) {
    return {
      title: 'Menu Not Found',
    }
  }

  return {
    title: `${restaurant.name} - Menu Digital`,
    description: restaurant.tagline || `Lihat menu lengkap ${restaurant.name}`,
  }
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch restaurant
  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (restaurantError || !restaurant) {
    notFound()
  }

  // Fetch categories with items
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order', { ascending: true })

  if (!categories) {
    return <div>Error loading menu</div>
  }

  // Fetch all menu items
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order', { ascending: true })

  if (!menuItems) {
    return <div>Error loading menu</div>
  }

  // Group items by category
  const categoriesWithItems = categories.map((category) => ({
    ...category,
    items: menuItems.filter((item) => item.category_id === category.id),
  }))

  // Filter out empty categories
  const nonEmptyCategories = categoriesWithItems.filter(
    (category) => category.items.length > 0
  )

  if (nonEmptyCategories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="text-2xl font-bold mb-2">Menu Sedang Disiapkan</h1>
          <p className="text-muted-foreground">
            Mohon maaf, menu sedang dalam proses persiapan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <MenuPageClient
      restaurant={restaurant}
      categories={nonEmptyCategories}
    />
  )
}
