'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search, Power, PowerOff, Filter, Utensils } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteMenuItem, toggleItemAvailability } from "./actions"
import { toast } from "sonner"

interface MenuItem {
  id: string
  name: string
  price: number
  description: string | null
  image_url: string | null
  is_available: boolean
  categories: { name: string } | null
}

interface MenuListClientProps {
  menuItems: MenuItem[]
  categories: { id: string; name: string }[]
}

export default function MenuListClient({ menuItems, categories }: MenuListClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isPending, startTransition] = useTransition()

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const [itemToDelete, setItemToDelete] = useState<{ id: string, name: string } | null>(null)

  const confirmDelete = async () => {
    if (!itemToDelete) return

    startTransition(async () => {
      const result = await deleteMenuItem(itemToDelete.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Menu "${itemToDelete.name}" berhasil dihapus`)
      }
      setItemToDelete(null)
    })
  }

  const handleToggleAvailability = async (id: string, name: string, currentStatus: boolean) => {
    startTransition(async () => {
      const result = await toggleItemAvailability(id, currentStatus)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Menu "${name}" ${!currentStatus ? 'tersedia' : 'tidak tersedia'}`)
      }
    })
  }

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.categories?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 p-8 min-h-screen bg-stone-50/50 dark:bg-stone-950/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">Daftar Menu</h1>
          <p className="text-muted-foreground text-lg">
            Kelola semua menu makanan dan minuman Anda
          </p>
        </div>
        <Link href="/dashboard/menu/new">
          <Button className="rounded-xl h-11 px-6 font-semibold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0">
            <Plus className="w-5 h-5 mr-2" />
            Tambah Menu Baru
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Cari menu..." 
                className="pl-10 h-11 rounded-xl border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-950/50 focus:ring-orange-500/20 focus:border-orange-500" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex h-11 w-full md:w-[200px] items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-950/50 px-3 py-2 pl-9 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none cursor-pointer"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Menampilkan <span className="font-semibold text-stone-900 dark:text-white">{filteredItems.length}</span> dari {menuItems.length} menu</p>
            <Link href="/dashboard/categories">
              <Button variant="link" size="sm" className="p-0 h-auto text-orange-600 hover:text-orange-700 font-medium">
                Kelola Kategori →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-stone-900 dark:text-white">Tidak ada menu ditemukan</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              {searchQuery || selectedCategory !== "all" 
                ? "Coba ubah filter pencarian Anda" 
                : "Mulai tambahkan menu pertama Anda"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <Link href="/dashboard/menu/new">
                <Button className="rounded-xl h-11 px-8 font-semibold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0">
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Menu Pertama
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-video bg-stone-100 dark:bg-stone-800 overflow-hidden">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-stone-100 dark:bg-stone-800">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center shadow-sm">
                        <Utensils className="w-8 h-8 text-stone-300" />
                      </div>
                      <p className="text-sm font-medium text-stone-400">No Image</p>
                    </div>
                  </div>
                )}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <Badge variant="destructive" className="text-sm px-3 py-1 font-bold shadow-lg">
                      <PowerOff className="w-3 h-3 mr-2" />
                      Stok Habis
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3 z-20">
                  <Badge className="shadow-lg bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-900 dark:text-white hover:bg-white border-0">
                    {item.categories?.name || 'Uncategorized'}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg line-clamp-1 mb-1 text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-5">
                  <p className="font-bold text-xl text-orange-600 dark:text-orange-500">
                    {formatRupiah(item.price)}
                  </p>
                  <Button
                    size="sm"
                    variant={item.is_available ? "outline" : "outline"}
                    className={`gap-2 h-8 rounded-lg text-xs font-medium border-2 ${
                      item.is_available 
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 hover:border-green-300' 
                        : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800 hover:border-red-300'
                    }`}
                    onClick={() => handleToggleAvailability(item.id, item.name, item.is_available)}
                    disabled={isPending}
                  >
                    {item.is_available ? (
                      <>
                        <Power className="w-3 h-3" />
                        Ready
                      </>
                    ) : (
                      <>
                        <PowerOff className="w-3 h-3" />
                        Habis
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <Link href={`/dashboard/menu/${item.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors">
                      <Pencil className="w-3 h-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                    onClick={() => setItemToDelete({ id: item.id, name: item.name })}
                    disabled={isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Menu?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus menu <span className="font-bold text-foreground">"{itemToDelete?.name}"</span>? 
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
