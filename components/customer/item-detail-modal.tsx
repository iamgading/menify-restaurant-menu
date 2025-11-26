'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Star, Tag, AlertCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import { MenuItem } from '@/types/database'

interface ItemDetailModalProps {
  item: MenuItem | null
  onClose: () => void
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-stone-900 w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 overflow-hidden">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 dark:text-stone-600">
              <svg
                className="w-32 h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {item.is_best_seller && (
              <Badge className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-lg px-3 py-1.5 text-sm font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                Best Seller
              </Badge>
            )}
            {item.is_promo && (
              <Badge className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg px-3 py-1.5 text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Promo
              </Badge>
            )}
            {!item.is_available && (
              <Badge className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg px-3 py-1.5 text-sm font-semibold">
                <AlertCircle className="w-4 h-4" />
                Habis
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[50vh]">
          {/* Title & Price */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white leading-tight">
              {item.name}
            </h2>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {formatRupiah(item.price)}
              </p>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full" />
                Deskripsi
              </h3>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed pl-3">
                {item.description}
              </p>
            </div>
          )}

          {/* Unavailable Warning */}
          {!item.is_available && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 dark:text-red-100 font-semibold text-sm">
                  Item Tidak Tersedia
                </p>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                  Maaf, item ini sedang tidak tersedia saat ini
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-stone-100 to-stone-200 hover:from-stone-200 hover:to-stone-300 dark:from-stone-800 dark:to-stone-700 dark:hover:from-stone-700 dark:hover:to-stone-600 text-stone-900 dark:text-white border-2 border-stone-200 dark:border-stone-700 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  )
}
