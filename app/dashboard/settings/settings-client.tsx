'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Store, Phone, Link as LinkIcon, Tag, Save, Sparkles } from "lucide-react"
import { updateRestaurant } from "./actions"
import { toast } from "sonner"
import Link from "next/link"

interface Restaurant {
  id: string
  name: string
  slug: string
  tagline: string | null
  whatsapp_number: string
  subscription_tier: string
  menu_item_limit: number
}

interface SettingsClientProps {
  restaurant: Restaurant
}

export default function SettingsClient({ restaurant }: SettingsClientProps) {
  const [formData, setFormData] = useState({
    name: restaurant.name,
    tagline: restaurant.tagline || '',
    whatsapp_number: restaurant.whatsapp_number,
  })
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('tagline', formData.tagline)
      data.append('whatsapp_number', formData.whatsapp_number)

      const result = await updateRestaurant(data)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Informasi restoran berhasil diupdate!')
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Pengaturan Restoran</h1>
          <p className="text-muted-foreground mt-2">
            Kelola informasi dan preferensi restoran Anda
          </p>
        </div>
        <Link href="/dashboard/subscription">
          <Button variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Kelola Subscription
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5 text-primary" />
                Informasi Restoran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Restoran *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama restoran Anda"
                    required
                    disabled={isPending}
                  />
                  <p className="text-xs text-muted-foreground">
                    Nama ini akan ditampilkan di menu digital Anda
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline / Deskripsi</Label>
                  <Textarea
                    id="tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Contoh: Authentic Indonesian Cuisine"
                    rows={3}
                    disabled={isPending}
                  />
                  <p className="text-xs text-muted-foreground">
                    Deskripsi singkat tentang restoran Anda
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp_number">Nomor WhatsApp *</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md border">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">+62</span>
                    </div>
                    <Input
                      id="whatsapp_number"
                      name="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      placeholder="8123456789"
                      required
                      disabled={isPending}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nomor ini akan digunakan pelanggan untuk order via WhatsApp
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md border">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">/r/</span>
                    </div>
                    <Input
                      id="slug"
                      value={restaurant.slug}
                      disabled
                      className="flex-1 bg-muted"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Slug tidak bisa diubah setelah dibuat
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    type="submit"
                    className="w-full btn-magnetic"
                    style={{background: 'var(--gradient-primary)'}}
                    disabled={isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Subscription Info */}
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge 
                  variant={restaurant.subscription_tier === 'pro' ? 'default' : 'secondary'}
                  className="text-lg px-4 py-2"
                >
                  {restaurant.subscription_tier === 'pro' ? '⭐ Pro Plan' : '🆓 Free Plan'}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Menu Limit:</span>
                  <span className="font-medium">
                    {restaurant.subscription_tier === 'pro' ? 'Unlimited' : `${restaurant.menu_item_limit} items`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Custom Branding:</span>
                  <span className="font-medium">
                    {restaurant.subscription_tier === 'pro' ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Analytics:</span>
                  <span className="font-medium">
                    {restaurant.subscription_tier === 'pro' ? '✓' : '✗'}
                  </span>
                </div>
              </div>

              {restaurant.subscription_tier === 'free' && (
                <Link href="/pricing">
                  <Button className="w-full btn-magnetic" style={{background: 'var(--gradient-primary)'}}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade ke Pro
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/dashboard/menu">
                <Button variant="outline" className="w-full justify-start">
                  Kelola Menu
                </Button>
              </Link>
              <Link href="/dashboard/categories">
                <Button variant="outline" className="w-full justify-start">
                  Kelola Kategori
                </Button>
              </Link>
              <Link href="/dashboard/qr-code">
                <Button variant="outline" className="w-full justify-start">
                  Download QR Code
                </Button>
              </Link>
              <Link href={`/r/${restaurant.slug}`} target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  Lihat Menu Live
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="glass border-primary/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Butuh Bantuan?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hubungi support kami untuk bantuan teknis
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Hubungi Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
