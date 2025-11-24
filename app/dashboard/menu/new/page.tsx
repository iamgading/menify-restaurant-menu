import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Need to check if exists, otherwise use Input
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" // Need to check if exists
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createMenuItem } from "../actions"
import { SubmitButton } from "@/components/submit-button" // Need to create this or use inline

export default async function NewMenuItemPage() {
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
    .select('id, name')
    .eq('restaurant_id', restaurant.id)
    .order('name')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tambah Menu Baru</h1>
        <p className="text-muted-foreground">
          Isi detail menu makanan atau minuman baru
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createMenuItem} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Menu</Label>
              <Input id="name" name="name" placeholder="Contoh: Nasi Goreng" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input id="price" name="price" type="number" placeholder="25000" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category_id">Kategori</Label>
                <select 
                  id="category_id" 
                  name="category_id" 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Input id="description" name="description" placeholder="Penjelasan singkat menu..." />
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="is_available" 
                name="is_available" 
                defaultChecked 
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="is_available">Tersedia (Stok Ada)</Label>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full btn-magnetic" style={{background: 'var(--gradient-primary)'}}>
                Simpan Menu
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
