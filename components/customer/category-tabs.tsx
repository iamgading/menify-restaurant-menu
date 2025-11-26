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
    <div className="w-full">
      <div
        ref={tabsRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3 container max-w-4xl mx-auto"
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
                'group flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0',
                isActive
                  ? 'text-white shadow-lg scale-105 ring-2 ring-primary/20'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 hover:border-primary/30 shadow-sm'
              )}
              style={isActive ? {background: 'var(--gradient-primary)'} : {}}
            >
              <span className={cn(
                'text-lg transition-transform duration-300',
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
