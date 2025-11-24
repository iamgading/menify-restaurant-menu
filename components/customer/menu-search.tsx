'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface MenuSearchProps {
  onSearch: (query: string) => void
}

export function MenuSearch({ onSearch }: MenuSearchProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Cari menu..."
        value={query}
        onChange={handleChange}
        className="pl-10 h-12 text-base"
      />
    </div>
  )
}
