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
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Kategori Menu</h1>
          <p className="text-muted-foreground mt-2">
            Kelola kategori untuk mengorganisir menu Anda
          </p>
        </div>
        <Button 
          className="gap-2 btn-magnetic pulse-glow" 
          style={{background: 'var(--gradient-primary)'}}
          onClick={() => setIsCreating(!isCreating)}
        >
          <Plus className="w-4 h-4" />
          {isCreating ? 'Batal' : 'Tambah Kategori'}
        </Button>
      </div>

      {/* Create New Category */}
      {isCreating && (
        <Card className="glass border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              Kategori Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="new-category">Nama Kategori</Label>
                <Input
                  id="new-category"
                  placeholder="Contoh: Makanan Utama, Minuman, Dessert..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  disabled={isPending}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="btn-magnetic" 
                  style={{background: 'var(--gradient-primary)'}}
                  disabled={isPending || !newCategoryName.trim()}
                >
                  Simpan Kategori
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
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
        <Card className="glass">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Tag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Belum ada kategori</h3>
            <p className="text-muted-foreground mb-6">
              Buat kategori untuk mengorganisir menu Anda dengan lebih baik
            </p>
            <Button 
              className="btn-magnetic" 
              style={{background: 'var(--gradient-primary)'}}
              onClick={() => setIsCreating(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
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
              <Card key={category.id} className="card-hover glass border-2 border-transparent hover:border-primary/30">
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        disabled={isPending}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleUpdate(category.id, category.name)}
                          disabled={isPending || !editCategoryName.trim()}
                        >
                          Simpan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={isPending}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl text-white shadow-lg">
                            <Tag className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{category.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Utensils className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {itemCount} menu
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 hover:border-primary hover:text-primary"
                          onClick={() => startEdit(category)}
                          disabled={isPending}
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive"
                          onClick={() => handleDelete(category.id, category.name, itemCount)}
                          disabled={isPending}
                        >
                          <Trash2 className="w-3 h-3" />
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
      <Card className="glass border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold mb-2">💡 Tips Kategori</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gunakan kategori untuk memudahkan pelanggan menemukan menu</li>
                <li>• Contoh kategori: Makanan Utama, Minuman, Dessert, Snack, dll</li>
                <li>• Kategori yang sudah memiliki menu tidak bisa dihapus</li>
                <li>• Setiap menu harus memiliki kategori</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
