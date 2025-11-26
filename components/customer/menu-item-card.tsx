'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import { MenuItem } from '@/types/database'
import { Star, Tag, AlertCircle, ChevronRight, Utensils } from 'lucide-react'

interface MenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <Card
      className={`group overflow-hidden cursor-pointer transition-all duration-300 border ${
        !item.is_available 
          ? 'opacity-60 hover:opacity-75 bg-muted/50' 
          : 'bg-card hover:bg-accent/5 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1'
      }`}
      onClick={onClick}
      style={{borderRadius: 'var(--radius)'}}
    >
      {/* Image Container with Zoom */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {item.image_url ? (
          <>
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Gradient Overlay on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-black" 
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-muted-foreground/50">
            <div className="text-center p-4">
              <Utensils className="w-12 h-12 mx-auto mb-2 opacity-50" />
            </div>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {item.is_best_seller && (
            <Badge 
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-none shadow-lg backdrop-blur-sm flex items-center gap-1.5 px-2.5 py-1"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold">Best Seller</span>
            </Badge>
          )}
          {item.is_promo && (
            <Badge 
              className="bg-red-500 hover:bg-red-600 text-white border-none shadow-lg backdrop-blur-sm flex items-center gap-1.5 px-2.5 py-1"
            >
              <Tag className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">Promo</span>
            </Badge>
          )}
        </div>

        {/* Sold Out Overlay */}
        {!item.is_available && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center z-20">
            <Badge 
              variant="destructive" 
              className="px-4 py-2 text-sm font-bold shadow-xl"
            >
              Stok Habis
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1">
            {item.name}
          </h3>
          
          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="pt-2 flex items-center justify-between border-t border-border/50 mt-auto">
          <p className="font-bold text-lg text-primary">
            {formatRupiah(item.price)}
          </p>
          
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
