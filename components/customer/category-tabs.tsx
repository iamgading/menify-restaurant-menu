'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Category } from '@/types/database'

interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryClick: (categoryId: string) => void
}

// Category icon mapping
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes('makanan') || name.includes('main')) return '🍚'
  if (name.includes('minuman') || name.includes('drink')) return '🥤'
  if (name.includes('snack') || name.includes('dessert')) return '🍰'
  if (name.includes('appetizer') || name.includes('pembuka')) return '🥗'
  return '🍽️'
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeCategory && tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(
        `[data-category-id="${activeCategory}"]`
      ) as HTMLElement
      
      if (activeTab) {
        const container = tabsRef.current
        const tabLeft = activeTab.offsetLeft
        const tabWidth = activeTab.offsetWidth
        const containerWidth = container.offsetWidth
        
        // Calculate center position
        const scrollLeft = tabLeft - (containerWidth / 2) + (tabWidth / 2)
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [activeCategory])

  return (
    <div className="bg-background border-b">
      <div
        ref={tabsRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-5 container max-w-4xl mx-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id
          return (
            <button
              key={category.id}
              data-category-id={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={cn(
                'group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-500 flex-shrink-0 shadow-md',
                'hover:scale-105 hover:shadow-lg',
                isActive
                  ? 'text-white shadow-xl scale-105'
                  : 'bg-white text-foreground hover:bg-white/90 border-2 border-border hover:border-primary/40'
              )}
              style={isActive ? {background: 'var(--gradient-primary)'} : {}}
            >
              <span className={cn(
                'text-2xl transition-transform duration-500',
                isActive ? 'scale-110' : 'group-hover:scale-110'
              )}>
                {getCategoryIcon(category.name)}
              </span>
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
