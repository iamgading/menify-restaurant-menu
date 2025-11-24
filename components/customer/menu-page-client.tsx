'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MenuSearch } from '@/components/customer/menu-search'
import { CategoryTabs } from '@/components/customer/category-tabs'
import { MenuItemCard } from '@/components/customer/menu-item-card'
import { ItemDetailModal } from '@/components/customer/item-detail-modal'
import { Category, MenuItem, Restaurant } from '@/types/database'

interface MenuPageClientProps {
  restaurant: Restaurant
  categories: (Category & { items: MenuItem[] })[]
}

export function MenuPageClient({ restaurant, categories }: MenuPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Filter categories and items based on search
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0)

  // Handle category click - smooth scroll
  const handleCategoryClick = (categoryId: string) => {
    const element = categoryRefs.current[categoryId]
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // Track active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 50 // Adjusted for non-sticky layout

      for (const category of filteredCategories) {
        const element = categoryRefs.current[category.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(category.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [filteredCategories])

  const whatsappLink = restaurant.whatsapp
    ? `https://wa.me/${restaurant.whatsapp.replace(/[^0-9]/g, '')}?text=Halo, saya ingin bertanya tentang menu`
    : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden" style={{background: 'var(--gradient-hero)'}}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
        
        <div className="container relative max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center text-white">
            {restaurant.logo_url && (
              <div className="mb-5 flex justify-center">
                <div className="relative float">
                  <div className="absolute inset-0 bg-white/30 rounded-3xl blur-2xl" />
                  <img
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    className="relative h-24 md:h-28 w-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
              {restaurant.name}
            </h1>
            {restaurant.tagline && (
              <p className="text-white/95 text-xl md:text-2xl font-semibold mb-3">
                {restaurant.tagline}
              </p>
            )}
            {restaurant.address && (
              <p className="text-white/85 text-base md:text-lg flex items-center justify-center gap-2.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {restaurant.address}
              </p>
            )}
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 5C120 10 240 20 360 23.3C480 27 600 23 720 21.7C840 20 960 20 1080 23.3C1200 27 1320 33 1380 36.7L1440 40V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </header>

      {/* Search */}
      <div className="bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <MenuSearch onSearch={setSearchQuery} />
        </div>
      </div>

      {/* Category Tabs */}
      {!searchQuery && filteredCategories.length > 0 && (
        <CategoryTabs
          categories={filteredCategories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      )}

      {/* Menu Items */}
      <main className="container max-w-4xl mx-auto px-4 py-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Tidak ditemukan</h3>
            <p className="text-muted-foreground">
              Coba kata kunci lain atau lihat semua menu
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                ref={(el) => {
                  categoryRefs.current[category.id] = el as HTMLDivElement | null
                }}
                className="scroll-mt-6"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {category.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* WhatsApp FAB */}
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Hover Label */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
              <div className="bg-[#25D366] text-white px-4 py-2 rounded-lg shadow-xl font-medium text-sm">
                Chat via WhatsApp
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-[#25D366]" />
              </div>
            </div>
            
            {/* Button */}
            <Button
              size="lg"
              className="rounded-full h-16 w-16 shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 bg-[#25D366] hover:bg-[#20BA5A] border-4 border-white group-hover:scale-110 pulse-glow"
              style={{
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)'
              }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </Button>
          </div>
        </a>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
