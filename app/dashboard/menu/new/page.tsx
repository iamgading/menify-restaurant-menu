import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Utensils } from "lucide-react"
import { CreateMenuForm } from "./create-menu-form"

export default async function NewMenuItemPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get restaurant or use placeholder
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  // FORCE BYPASS: Jangan block jika restaurant null
  // Get categories or use default ones
  let categories: Array<{ id: string; name: string }> = []
  
  if (restaurant) {
    const { data: dbCategories } = await supabase
      .from('categories')
      .select('id, name')
      .eq('restaurant_id', restaurant.id)
      .order('name')
    
    categories = dbCategories || []
  }
  
  // If no categories, provide default ones (will be created on first menu save)
  if (categories.length === 0) {
    categories = [
      { id: 'temp-1', name: 'Makanan Utama' },
      { id: 'temp-2', name: 'Minuman' },
      { id: 'temp-3', name: 'Snack & Dessert' },
    ]
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <Link 
          href="/dashboard/menu" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Menu
        </Link>
        <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-2">Tambah Menu Baru</h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg">
          Buat menu makanan atau minuman yang menarik untuk pelanggan Anda.
        </p>
      </div>

      <Card className="border-none shadow-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-600" />
        <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle className="text-xl">Informasi Menu</CardTitle>
              <CardDescription>Lengkapi detail menu di bawah ini</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <CreateMenuForm categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}
