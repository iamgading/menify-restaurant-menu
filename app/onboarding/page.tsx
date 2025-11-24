"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Store, Utensils, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { completeOnboarding } from "./actions"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantSlug: "",
    restaurantPhone: "",
    categoryName: "",
    itemName: "",
    itemPrice: "",
    itemDescription: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from name
    if (name === "restaurantName") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      setFormData(prev => ({ ...prev, restaurantSlug: slug }))
    }
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = async () => {
    setIsLoading(true)
    const result = await completeOnboarding(formData)
    
    if (result?.error) {
      alert(result.error)
      setIsLoading(false)
    } else {
      // Redirect handled in server action or here
      // router.push('/dashboard') // Server action handles redirect
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8 flex justify-between items-center px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              <span className={`text-xs font-medium ${step >= s ? "text-primary" : "text-muted-foreground"}`}>
                {s === 1 ? "Restoran" : s === 2 ? "Menu Pertama" : "Selesai"}
              </span>
            </div>
          ))}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">
              {step === 1 && "Info Restoran"}
              {step === 2 && "Buat Menu Pertama"}
              {step === 3 && "Siap Diluncurkan!"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Ceritakan sedikit tentang restoran Anda"}
              {step === 2 && "Tambahkan satu kategori dan menu untuk memulai"}
              {step === 3 && "Review data Anda sebelum menyelesaikan setup"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Nama Restoran</Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      placeholder="Contoh: Warung Makan Ibu"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restaurantSlug">Link Menu (URL)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md border">
                      menuqr.com/r/
                    </span>
                    <Input
                      id="restaurantSlug"
                      name="restaurantSlug"
                      value={formData.restaurantSlug}
                      onChange={handleInputChange}
                      placeholder="warung-ibu"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ini akan menjadi link yang dibuka pelanggan saat scan QR.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restaurantPhone">Nomor WhatsApp Restoran</Label>
                  <Input
                    id="restaurantPhone"
                    name="restaurantPhone"
                    value={formData.restaurantPhone}
                    onChange={handleInputChange}
                    placeholder="0812..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Pesanan akan dikirim ke nomor ini.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Nama Kategori</Label>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Makanan Berat, Minuman"
                  />
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Menu Item Pertama
                  </h4>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemName">Nama Menu</Label>
                      <Input
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        placeholder="Contoh: Nasi Goreng Spesial"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="itemPrice">Harga (Rp)</Label>
                      <Input
                        id="itemPrice"
                        name="itemPrice"
                        type="number"
                        value={formData.itemPrice}
                        onChange={handleInputChange}
                        placeholder="25000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="itemDescription">Deskripsi (Opsional)</Label>
                      <Input
                        id="itemDescription"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleInputChange}
                        placeholder="Nasi goreng dengan telur, ayam suwir..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-12 h-12 text-success" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">Semuanya Siap!</h3>
                  <p className="text-muted-foreground">
                    Klik tombol di bawah untuk membuat restoran Anda dan mulai berjualan.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg text-left text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Restoran:</span>
                    <span className="font-medium">{formData.restaurantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Link:</span>
                    <span className="font-medium">/r/{formData.restaurantSlug}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Menu Pertama:</span>
                    <span className="font-medium">{formData.itemName}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between p-6 md:p-8 bg-muted/10">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep} disabled={isLoading}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            )}
            
            {step < 3 ? (
              <Button 
                className="ml-auto btn-magnetic" 
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.restaurantName || !formData.restaurantSlug)) ||
                  (step === 2 && (!formData.categoryName || !formData.itemName || !formData.itemPrice))
                }
                style={{background: 'var(--gradient-primary)'}}
              >
                Lanjut
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                className="w-full btn-magnetic text-lg py-6 font-bold" 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{background: 'var(--gradient-primary)'}}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Selesai & Masuk Dashboard"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
