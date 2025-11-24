'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import { MenuItem } from '@/types/database'
import { Star, Tag, AlertCircle, ChevronRight } from 'lucide-react'

interface MenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-500 border-2 ${
        !item.is_available 
          ? 'opacity-60 hover:opacity-75' 
          : 'border-border hover:border-primary/40 card-hover'
      }`}
      onClick={onClick}
      style={{borderRadius: 'var(--radius)'}}
    >
      {/* Image Container with Zoom */}
      <div className="relative aspect-square bg-gradient-to-br from-muted to-background overflow-hidden img-zoom">
        {item.image_url ? (
          <>
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Gradient Overlay on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{background: 'var(--gradient-card)'}}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <svg
                className="w-24 h-24 mx-auto mb-3 opacity-30"
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
              <p className="text-sm opacity-50 font-medium">No Image</p>
            </div>
          </div>
        )}
        
        {/* Badges with Enhanced Glass */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1.5 md:gap-2.5">
          {item.is_best_seller && (
            <Badge 
              variant="warning" 
              className="glass border-white/40 shadow-xl backdrop-blur-xl flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 font-bold text-xs md:text-sm"
            >
              <Star className="w-3 md:w-4 h-3 md:h-4 fill-current" />
              <span className="hidden md:inline">Best Seller</span>
              <span className="md:hidden">Best</span>
            </Badge>
          )}
          {item.is_promo && (
            <Badge 
              variant="success" 
              className="glass border-white/40 shadow-xl backdrop-blur-xl flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 font-bold text-xs md:text-sm"
            >
              <Tag className="w-3 md:w-4 h-3 md:h-4" />
              <span>Promo</span>
            </Badge>
          )}
        </div>

        {/* Sold Out Overlay */}
        {!item.is_available && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
            <Badge 
              variant="destructive" 
              className="flex items-center gap-2.5 px-6 py-3 text-lg font-bold shadow-2xl"
            >
              <AlertCircle className="w-6 h-6" />
              <span>Habis</span>
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-3 md:p-6 space-y-2 md:space-y-3">
        <h3 className="font-bold text-base md:text-xl leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {item.name}
        </h3>
        
        {item.description && (
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2rem] md:min-h-[2.5rem]">
            {item.description}
          </p>
        )}
        
        <div className="pt-1 md:pt-2 flex items-center justify-between">
          <p className="font-bold text-xl md:text-3xl" style={{background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            {formatRupiah(item.price)}
          </p>
          
          {/* View Detail Hint */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            <span className="font-medium">Detail</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
