import { createClient } from "@/lib/supabase/server"
import { QRCodeGenerator } from "@/components/dashboard/qr-code-generator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Printer, Share2, Smartphone } from "lucide-react"

export default async function QRCodePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  const menuUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/r/${restaurant.slug}`

  return (
    <div className="space-y-8 p-8 min-h-screen bg-stone-50/50 dark:bg-stone-950/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">QR Code Menu</h1>
        <p className="text-muted-foreground text-lg">
          Download dan cetak QR code untuk menu digital Anda
        </p>
      </div>

      <QRCodeGenerator url={menuUrl} restaurantName={restaurant.name} />

      {/* Tips & Instructions */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <Printer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-stone-900 dark:text-white">1. Cetak QR Code</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Download QR code dalam format PNG berkualitas tinggi dan cetak di kertas, acrylic, atau stiker.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <QrCode className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-stone-900 dark:text-white">2. Letakkan di Meja</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tempatkan QR code di setiap meja atau area yang mudah terlihat pelanggan.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white dark:bg-stone-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
          <CardContent className="p-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-stone-900 dark:text-white">3. Pelanggan Scan</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pelanggan tinggal scan dengan kamera smartphone untuk melihat menu digital.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-none shadow-lg bg-orange-50/50 dark:bg-orange-900/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Share2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-stone-900 dark:text-white">💡 Tips Penggunaan QR Code</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-orange-200 text-orange-700 bg-orange-50">1</Badge>
                  <span>Cetak dengan ukuran minimal 5x5 cm agar mudah di-scan</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-orange-200 text-orange-700 bg-orange-50">2</Badge>
                  <span>Gunakan material tahan air seperti acrylic atau laminating</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-orange-200 text-orange-700 bg-orange-50">3</Badge>
                  <span>Letakkan di tempat dengan pencahayaan yang baik</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-orange-200 text-orange-700 bg-orange-50">4</Badge>
                  <span>Tambahkan teks "Scan untuk lihat menu" di bawah QR code</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5 border-orange-200 text-orange-700 bg-orange-50">5</Badge>
                  <span>Test scan QR code sebelum dicetak untuk memastikan berfungsi</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
