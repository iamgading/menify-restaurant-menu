"use client"

import { useState, useEffect, useRef } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Copy, Check, ExternalLink } from "lucide-react"
import Link from "next/link"

interface QRCodeGeneratorProps {
  url: string
  restaurantName: string
}

export function QRCodeGenerator({ url, restaurantName }: QRCodeGeneratorProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    generateQR()
  }, [url])

  const generateQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 1000,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
      setQrDataUrl(dataUrl)
    } catch (err) {
      console.error(err)
    }
  }

  const downloadQR = () => {
    const link = document.createElement("a")
    link.download = `${restaurantName.replace(/\s+/g, "-")}-menu-qr.png`
    link.href = qrDataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Preview Card */}
      <Card className="p-8 flex flex-col items-center justify-center bg-white border-2 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="font-bold text-2xl mb-1">{restaurantName}</h3>
          <p className="text-muted-foreground">Scan untuk lihat menu</p>
        </div>
        
        <div className="relative w-64 h-64 mb-6">
          {qrDataUrl && (
            <img src={qrDataUrl} alt="QR Code" className="w-full h-full" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Menu Aktif
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">QR Code Menu</h2>
          <p className="text-muted-foreground">
            Download QR code ini dan cetak untuk diletakkan di meja restoran Anda.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg border">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Link Menu Digital
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-background p-2 rounded border text-sm truncate">
                {url}
              </code>
              <Button size="icon" variant="outline" onClick={copyLink}>
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Link href={url} target="_blank">
                <Button size="icon" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <Button 
            onClick={downloadQR} 
            className="w-full h-12 text-lg font-bold btn-magnetic"
            style={{background: 'var(--gradient-primary)'}}
          >
            <Download className="w-5 h-5 mr-2" />
            Download QR Code (PNG)
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Format PNG kualitas tinggi (1000x1000px). Cocok untuk dicetak di kertas, acrylic, atau stiker meja.
          </p>
        </div>
      </div>
    </div>
  )
}
