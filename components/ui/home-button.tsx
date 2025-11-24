'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HomeButton() {
  const pathname = usePathname()

  // Jangan tampilkan di halaman utama (home)
  if (pathname === '/') return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Link href="/">
        <Button
          size="icon"
          variant="outline"
          className={cn(
            "rounded-full w-12 h-12 shadow-lg bg-background/80 backdrop-blur-sm border-border hover:bg-background hover:scale-110 transition-all duration-300 group",
            "hover:w-auto hover:px-4" // Expand on hover
          )}
        >
          <Home className="w-5 h-5 text-foreground group-hover:mr-2 transition-all" />
          <span className="w-0 overflow-hidden group-hover:w-auto transition-all duration-300 whitespace-nowrap font-medium">
            Beranda
          </span>
        </Button>
      </Link>
    </div>
  )
}
