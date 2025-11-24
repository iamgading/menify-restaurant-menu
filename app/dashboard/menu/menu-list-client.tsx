'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search, Power, PowerOff, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { deleteMenuItem, toggleMenuItemAvailability } from "./actions"
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

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus menu "${name}"?`)) return

    startTransition(async () => {
      const result = await deleteMenuItem(id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(`Menu "${name}" berhasil dihapus`)
      }
    })
  }

  const handleToggleAvailability = async (id: string, name: string, currentStatus: boolean) => {
    startTransition(async () => {
      const result = await toggleMenuItemAvailability(id, !currentStatus)
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
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Daftar Menu</h1>
          <p className="text-muted-foreground mt-2">
            Kelola semua menu makanan dan minuman Anda
          </p>
        </div>
        <Link href="/dashboard/menu/new">
          <Button className="gap-2 btn-magnetic pulse-glow" style={{background: 'var(--gradient-primary)'}}>
            <Plus className="w-4 h-4" />
            Tambah Menu Baru
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari menu..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-10 w-full md:w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
            <p>Menampilkan {filteredItems.length} dari {menuItems.length} menu</p>
            <Link href="/dashboard/categories">
              <Button variant="link" size="sm" className="p-0 h-auto">
                Kelola Kategori →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <Card className="glass">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tidak ada menu ditemukan</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || selectedCategory !== "all" 
                ? "Coba ubah filter pencarian Anda" 
                : "Mulai tambahkan menu pertama Anda"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <Link href="/dashboard/menu/new">
                <Button className="btn-magnetic" style={{background: 'var(--gradient-primary)'}}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Menu Pertama
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group card-hover glass border-2 border-transparent hover:border-primary/30">
              <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 img-zoom">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Pencil className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      <PowerOff className="w-4 h-4 mr-2" />
                      Stok Habis
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant={item.is_available ? "default" : "secondary"} className="shadow-lg">
                    {item.categories?.name || 'Uncategorized'}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg line-clamp-1 mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-xl text-primary">
                    {formatRupiah(item.price)}
                  </p>
                  <Button
                    size="sm"
                    variant={item.is_available ? "default" : "outline"}
                    className={`gap-2 ${item.is_available ? 'bg-success hover:bg-success/90' : 'border-destructive text-destructive hover:bg-destructive/10'}`}
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
                
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Link href={`/dashboard/menu/${item.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2 hover:border-primary hover:text-primary">
                      <Pencil className="w-3 h-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive"
                    onClick={() => handleDelete(item.id, item.name)}
                    disabled={isPending}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
