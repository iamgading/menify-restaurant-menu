'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Store, Phone, Link as LinkIcon, Tag, Save, Sparkles, Crown, Zap } from "lucide-react"
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
    <div className="space-y-8 p-8 min-h-screen bg-stone-50/50 dark:bg-stone-950/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">Pengaturan Restoran</h1>
          <p className="text-muted-foreground text-lg">
            Kelola informasi dan preferensi restoran Anda
          </p>
        </div>
        <Link href="/dashboard/subscription">
          <Button variant="outline" className="gap-2 h-10 rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Kelola Subscription
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-stone-900 dark:text-white">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Store className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                Informasi Restoran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-stone-900 dark:text-white font-medium">Nama Restoran *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama restoran Anda"
                    required
                    disabled={isPending}
                    className="h-11 rounded-xl border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                  <p className="text-xs text-muted-foreground">
                    Nama ini akan ditampilkan di menu digital Anda
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline" className="text-stone-900 dark:text-white font-medium">Tagline / Deskripsi</Label>
                  <Textarea
                    id="tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Contoh: Authentic Indonesian Cuisine"
                    rows={3}
                    disabled={isPending}
                    className="rounded-xl border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Deskripsi singkat tentang restoran Anda
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp_number" className="text-stone-900 dark:text-white font-medium">Nomor WhatsApp *</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                      <Phone className="w-4 h-4 text-stone-500" />
                      <span className="text-sm font-medium text-stone-700 dark:text-stone-300">+62</span>
                    </div>
                    <Input
                      id="whatsapp_number"
                      name="whatsapp_number"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      placeholder="8123456789"
                      required
                      disabled={isPending}
                      className="flex-1 h-11 rounded-xl border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nomor ini akan digunakan pelanggan untuk order via WhatsApp
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-stone-900 dark:text-white font-medium">URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                      <LinkIcon className="w-4 h-4 text-stone-500" />
                      <span className="text-sm font-medium text-stone-700 dark:text-stone-300">/r/</span>
                    </div>
                    <Input
                      id="slug"
                      value={restaurant.slug}
                      disabled
                      className="flex-1 h-11 rounded-xl border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-500"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Slug tidak bisa diubah setelah dibuat
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0"
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
          <Card className="border-none shadow-lg bg-white dark:bg-stone-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-stone-900 dark:text-white">Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Badge 
                  variant={restaurant.subscription_tier === 'pro' ? 'default' : 'secondary'}
                  className={`text-lg px-4 py-2 w-full justify-center ${restaurant.subscription_tier === 'pro' ? 'bg-gradient-to-r from-orange-500 to-amber-600 border-0' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'}`}
                >
                  {restaurant.subscription_tier === 'pro' ? (
                    <span className="flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Pro Plan
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Free Plan
                    </span>
                  )}
                </Badge>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 rounded-lg bg-stone-50 dark:bg-stone-900/50">
                  <span className="text-muted-foreground">Menu Limit</span>
                  <span className="font-bold text-stone-900 dark:text-white">
                    {restaurant.subscription_tier === 'pro' ? 'Unlimited' : `${restaurant.menu_item_limit} items`}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-stone-50 dark:bg-stone-900/50">
                  <span className="text-muted-foreground">Custom Branding</span>
                  <span className={`font-bold ${restaurant.subscription_tier === 'pro' ? 'text-green-600' : 'text-stone-400'}`}>
                    {restaurant.subscription_tier === 'pro' ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-stone-50 dark:bg-stone-900/50">
                  <span className="text-muted-foreground">Analytics</span>
                  <span className={`font-bold ${restaurant.subscription_tier === 'pro' ? 'text-green-600' : 'text-stone-400'}`}>
                    {restaurant.subscription_tier === 'pro' ? '✓' : '✗'}
                  </span>
                </div>
              </div>

              {restaurant.subscription_tier === 'free' && (
                <Link href="/pricing" className="block">
                  <Button className="w-full h-10 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-200 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-0">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade ke Pro
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-none shadow-lg bg-white dark:bg-stone-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-stone-900 dark:text-white">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/menu" className="block">
                <Button variant="outline" className="w-full justify-start h-10 rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Kelola Menu
                </Button>
              </Link>
              <Link href="/dashboard/categories" className="block">
                <Button variant="outline" className="w-full justify-start h-10 rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Kelola Kategori
                </Button>
              </Link>
              <Link href="/dashboard/qr-code" className="block">
                <Button variant="outline" className="w-full justify-start h-10 rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Download QR Code
                </Button>
              </Link>
              <Link href={`/r/${restaurant.slug}`} target="_blank" className="block">
                <Button variant="outline" className="w-full justify-start h-10 rounded-xl border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                  Lihat Menu Live
                  <LinkIcon className="w-3 h-3 ml-auto opacity-50 group-hover:opacity-100" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="border-none shadow-lg bg-blue-50/50 dark:bg-blue-900/10">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold mb-2 text-stone-900 dark:text-white">Butuh Bantuan?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hubungi support kami untuk bantuan teknis
                </p>
                <Button variant="outline" size="sm" className="w-full rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20">
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
