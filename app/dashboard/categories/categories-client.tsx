'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Tag, Utensils } from "lucide-react"
import { createCategory, updateCategory, deleteCategory } from "./actions"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
  menu_items: { count: number }[]
}

interface CategoriesClientProps {
  categories: Category[]
  restaurantId: string
}

export default function CategoriesClient({ categories, restaurantId }: CategoriesClientProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editCategoryName, setEditCategoryName] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('name', newCategoryName)
      
      const result = await createCategory(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Kategori "${newCategoryName}" berhasil dibuat`)
        setNewCategoryName("")
        setIsCreating(false)
      }
    })
  }

  const handleUpdate = async (id: string, oldName: string) => {
    if (!editCategoryName.trim()) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('name', editCategoryName)
      
      const result = await updateCategory(id, formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Kategori "${oldName}" berhasil diubah`)
        setEditingId(null)
        setEditCategoryName("")
      }
    })
  }

  const handleDelete = async (id: string, name: string, itemCount: number) => {
    if (itemCount > 0) {
      toast.error(`Tidak bisa menghapus kategori "${name}" karena masih ada ${itemCount} menu`)
      return
    }

    if (!confirm(`Yakin ingin menghapus kategori "${name}"?`)) return

    startTransition(async () => {
      const result = await deleteCategory(id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Kategori "${name}" berhasil dihapus`)
      }
    })
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setEditCategoryName(category.name)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditCategoryName("")
  }

  return (
    <div className="space-y-8 p-8 min-h-screen bg-stone-50/50 dark:bg-stone-950/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">Kategori Menu</h1>
          <p className="text-muted-foreground text-lg">
            Kelola kategori untuk mengorganisir menu Anda
          </p>
        </div>
        <Button 
          className="rounded-xl h-11 px-6 font-semibold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0"
          onClick={() => setIsCreating(!isCreating)}
        >
          <Plus className="w-5 h-5 mr-2" />
          {isCreating ? 'Batal' : 'Tambah Kategori'}
        </Button>
      </div>

      {/* Create New Category */}
      {isCreating && (
        <Card className="border-none shadow-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-l-4 border-l-orange-500 animate-in slide-in-from-top-4 duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-white">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Tag className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              Kategori Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="new-category" className="text-stone-600 dark:text-stone-400">Nama Kategori</Label>
                <Input
                  id="new-category"
                  placeholder="Contoh: Makanan Utama, Minuman, Dessert..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  disabled={isPending}
                  autoFocus
                  className="mt-1.5 h-11 rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-950/50 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="rounded-xl h-11 px-6 font-semibold shadow-md active:scale-95 transition-all bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={isPending || !newCategoryName.trim()}
                >
                  Simpan Kategori
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="rounded-xl h-11 px-6 border-stone-200 hover:bg-stone-100 dark:border-stone-800 dark:hover:bg-stone-800"
                  onClick={() => {
                    setIsCreating(false)
                    setNewCategoryName("")
                  }}
                  disabled={isPending}
                >
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <Tag className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-stone-900 dark:text-white">Belum ada kategori</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Buat kategori untuk mengorganisir menu Anda dengan lebih baik
            </p>
            <Button 
              className="rounded-xl h-11 px-8 font-semibold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Buat Kategori Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const itemCount = category.menu_items?.[0]?.count || 0
            const isEditing = editingId === category.id

            return (
              <Card key={category.id} className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        disabled={isPending}
                        autoFocus
                        className="h-10 rounded-lg border-orange-200 focus:border-orange-500 focus:ring-orange-500/20"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white"
                          onClick={() => handleUpdate(category.id, category.name)}
                          disabled={isPending || !editCategoryName.trim()}
                        >
                          Simpan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg border-stone-200 hover:bg-stone-100"
                          onClick={cancelEdit}
                          disabled={isPending}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                            <Tag className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">{category.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Utensils className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground font-medium">
                                {itemCount} menu
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
                          onClick={() => startEdit(category)}
                          disabled={isPending}
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                          onClick={() => handleDelete(category.id, category.name, itemCount)}
                          disabled={isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Info Card */}
      <Card className="border-none shadow-lg bg-blue-50/50 dark:bg-blue-900/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold mb-2 text-stone-900 dark:text-white">💡 Tips Kategori</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Gunakan kategori untuk memudahkan pelanggan menemukan menu
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Contoh kategori: Makanan Utama, Minuman, Dessert, Snack, dll
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Kategori yang sudah memiliki menu tidak bisa dihapus
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Setiap menu harus memiliki kategori
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
