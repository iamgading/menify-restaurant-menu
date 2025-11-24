"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock } from "lucide-react"
import { login } from "../actions"
import { toast } from "sonner"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      // Show error toast (assuming sonner or similar is installed, or just alert for now)
      alert(result.error)
      setIsLoading(false)
    }
    // If success, redirect happens in server action
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Selamat Datang Kembali</h1>
        <p className="text-muted-foreground">
          Masuk ke dashboard untuk mengelola restoran Anda
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="nama@email.com" 
              className="pl-10" 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm font-medium text-primary hover:underline"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="password" 
              name="password"
              type="password" 
              className="pl-10" 
              required 
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-magnetic font-bold text-lg h-12" 
          disabled={isLoading}
          style={{background: 'var(--gradient-primary)'}}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Masuk...
            </>
          ) : (
            "Masuk Dashboard"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/auth/signup" className="font-bold text-primary hover:underline">
          Daftar gratis
        </Link>
      </div>
    </div>
  )
}
