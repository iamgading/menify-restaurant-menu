import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EditMenuForm } from "./edit-menu-form"
import { notFound } from "next/navigation"

export default async function EditMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get restaurant
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  // Get menu item
  const { data: menuItem } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!menuItem) {
    notFound()
  }

  // Get categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .eq('restaurant_id', restaurant.id)
    .order('name')

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <Link 
          href="/dashboard/menu" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Menu
        </Link>
        
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">Edit Menu</h1>
            <p className="text-muted-foreground text-lg">Perbarui informasi menu Anda</p>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl">
        <CardHeader className="border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <CardTitle className="text-xl">Informasi Menu</CardTitle>
          <CardDescription>Ubah detail menu yang ingin Anda update</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <EditMenuForm 
            menuItem={menuItem} 
            categories={categories || []} 
          />
        </CardContent>
      </Card>
    </div>
  )
}
