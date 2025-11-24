'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  glow?: boolean
  magnetic?: boolean
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    iconPosition = 'left',
    glow = false,
    magnetic = true,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold rounded-2xl
      transition-all duration-300 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      overflow-hidden group
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
    `
    
    const variants = {
      primary: `
        bg-primary text-primary-foreground
        hover:bg-primary/90
        shadow-lg hover:shadow-xl
        ${glow ? 'glow' : ''}
      `,
      secondary: `
        bg-secondary text-secondary-foreground
        hover:bg-secondary/80
        shadow-md hover:shadow-lg
      `,
      outline: `
        border-2 border-primary text-primary
        hover:bg-primary hover:text-primary-foreground
        shadow-sm hover:shadow-md
      `,
      ghost: `
        text-foreground hover:bg-card
        hover:shadow-sm
      `,
      gradient: `
        bg-gradient-to-r from-primary to-accent
        text-white
        shadow-lg hover:shadow-xl
        ${glow ? 'glow-accent' : ''}
      `
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          magnetic && 'magnetic-hover',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ripple Effect Background */}
        <span className="absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </span>
        
        {/* Shimmer Effect */}
        <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
        
        {/* Content */}
        <span className="relative flex items-center gap-2 z-10">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {!loading && icon && iconPosition === 'left' && icon}
          {children}
          {!loading && icon && iconPosition === 'right' && icon}
        </span>
      </button>
    )
  }
)

PremiumButton.displayName = 'PremiumButton'
