'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createMenuItem } from "../actions"
import Link from "next/link"
import { ArrowLeft, Utensils, DollarSign, AlignLeft, List, CheckCircle2, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
}

interface CreateMenuFormProps {
  categories: Category[];
}

const initialState = {
  message: null,
  errors: null,
}

export function CreateMenuForm({ categories }: CreateMenuFormProps) {
  // @ts-ignore
  const [state, formAction, isPending] = useActionState(createMenuItem, initialState)
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef} className="space-y-8">
      <div className="grid gap-6">
        {/* Nama Menu */}
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base font-semibold">Nama Menu</Label>
          <div className="relative">
            <Utensils className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              id="name" 
              name="name" 
              placeholder="Contoh: Nasi Goreng Spesial" 
              required 
              className="pl-10 h-12 text-lg bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Harga */}
          <div className="space-y-3">
            <Label htmlFor="price" className="text-base font-semibold">Harga (Rp)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="price" 
                name="price" 
                type="number" 
                placeholder="25000" 
                required 
                className="pl-10 h-12 text-lg bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 focus:border-orange-500 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>
          
          {/* Kategori */}
          <div className="space-y-3">
            <Label htmlFor="category_id" className="text-base font-semibold">Kategori</Label>
            <div className="relative">
              <List className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
              <select 
                id="category_id" 
                name="category_id" 
                className="flex h-12 w-full items-center justify-between rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="space-y-3">
          <Label htmlFor="description" className="text-base font-semibold">Deskripsi</Label>
          <div className="relative">
            <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Jelaskan bahan utama, rasa, atau keunikan menu ini..." 
              className="pl-10 min-h-[120px] bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 focus:border-orange-500 focus:ring-orange-500/20 transition-all resize-none"
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800">
          <div className="space-y-0.5">
            <Label htmlFor="is_available" className="text-base font-semibold cursor-pointer">Status Ketersediaan</Label>
            <p className="text-sm text-muted-foreground">Aktifkan jika menu ini tersedia untuk dipesan</p>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="is_available" 
              name="is_available" 
              defaultChecked 
              className="h-6 w-6 rounded border-gray-300 text-orange-600 focus:ring-orange-500 transition-all cursor-pointer accent-orange-600"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <Label htmlFor="image" className="text-base font-semibold">Foto Menu (Opsional)</Label>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative w-full max-w-xs">
              <img 
                src={imagePreview} 
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border-2 border-orange-200 dark:border-orange-800 shadow-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null)
                  const input = document.getElementById('image') as HTMLInputElement
                  if (input) input.value = ''
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">✓ Gambar siap di-upload</p>
            </div>
          )}
          
          <div className="relative">
            <Input 
              id="image" 
              name="image" 
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="h-12 bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 focus:border-orange-500 focus:ring-orange-500/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Validate file size (max 5MB)
                  if (file.size > 5 * 1024 * 1024) {
                    toast.error('Ukuran file maksimal 5MB')
                    e.target.value = ''
                    setImagePreview(null)
                    return
                  }
                  // Validate file type
                  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
                  if (!validTypes.includes(file.type)) {
                    toast.error('Format file harus JPG, PNG, atau WebP')
                    e.target.value = ''
                    setImagePreview(null)
                    return
                  }
                  
                  // Create preview
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string)
                    toast.success('Gambar berhasil dipilih!')
                  }
                  reader.readAsDataURL(file)
                } else {
                  setImagePreview(null)
                }
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Format: JPG, PNG, atau WebP. Maksimal 5MB.</p>
        </div>
      </div>

      <div className="pt-6 flex gap-4">
        <Link href="/dashboard/menu" className="flex-1">
          <Button variant="outline" type="button" className="w-full h-12 text-base font-medium border-stone-200 hover:bg-stone-100 hover:text-stone-900">
            Batal
          </Button>
        </Link>
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="flex-[2] h-12 text-base font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Menyimpan...
        </>
      ) : (
        <>
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Simpan Menu
        </>
      )}
    </Button>
  )
}
