'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Star, Tag, AlertCircle } from 'lucide-react'
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
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-background w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/10] bg-muted">
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
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg
                className="w-24 h-24"
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

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {item.is_best_seller && (
              <Badge variant="warning" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Best Seller
              </Badge>
            )}
            {item.is_promo && (
              <Badge variant="success" className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Promo
              </Badge>
            )}
            {!item.is_available && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Habis
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <p className="text-3xl font-bold text-primary mb-4">
            {formatRupiah(item.price)}
          </p>

          {item.description && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Deskripsi</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {!item.is_available && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
              <p className="text-destructive font-medium">
                Maaf, item ini sedang tidak tersedia
              </p>
            </div>
          )}

          <Button
            onClick={onClose}
            className="w-full h-12 text-base"
            variant="outline"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  )
}
