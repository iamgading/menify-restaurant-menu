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
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">QR Code Menu</h1>
        <p className="text-muted-foreground">
          Download dan cetak QR code untuk menu digital Anda
        </p>
      </div>

      <QRCodeGenerator url={menuUrl} restaurantName={restaurant.name} />

      {/* Tips & Instructions */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="glass card-hover">
          <CardContent className="p-6">
            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
              <Printer className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">1. Cetak QR Code</h3>
            <p className="text-sm text-muted-foreground">
              Download QR code dalam format PNG berkualitas tinggi dan cetak di kertas, acrylic, atau stiker.
            </p>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardContent className="p-6">
            <div className="p-3 bg-accent/10 rounded-xl w-fit mb-4">
              <QrCode className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2">2. Letakkan di Meja</h3>
            <p className="text-sm text-muted-foreground">
              Tempatkan QR code di setiap meja atau area yang mudah terlihat pelanggan.
            </p>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardContent className="p-6">
            <div className="p-3 bg-success/10 rounded-xl w-fit mb-4">
              <Smartphone className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-bold text-lg mb-2">3. Pelanggan Scan</h3>
            <p className="text-sm text-muted-foreground">
              Pelanggan tinggal scan dengan kamera smartphone untuk melihat menu digital.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="glass border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Share2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">💡 Tips Penggunaan QR Code</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <span>Cetak dengan ukuran minimal 5x5 cm agar mudah di-scan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <span>Gunakan material tahan air seperti acrylic atau laminating</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <span>Letakkan di tempat dengan pencahayaan yang baik</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <span>Tambahkan teks "Scan untuk lihat menu" di bawah QR code</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">5</Badge>
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
