'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'outline' | 'gradient'
  hover?: boolean
  glow?: boolean
  children: ReactNode
}

export function PremiumCard({
  variant = 'glass',
  hover = true,
  glow = false,
  className,
  children,
  ...props
}: PremiumCardProps) {
  const variants = {
    glass: `
      premium-glass
      ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''}
    `,
    solid: `
      bg-card border border-border
      ${hover ? 'hover:border-primary/30 hover:shadow-lg' : ''}
    `,
    outline: `
      border-2 border-border
      ${hover ? 'hover:border-primary hover:shadow-lg' : ''}
    `,
    gradient: `
      bg-gradient-to-br from-primary/10 via-accent/5 to-transparent
      border border-primary/20
      ${hover ? 'hover:from-primary/20 hover:shadow-xl' : ''}
      ${glow ? 'glow' : ''}
    `
  }
  
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface PremiumCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  title: string
  description?: string
}

export function PremiumCardHeader({
  icon,
  title,
  description,
  className,
  ...props
}: PremiumCardHeaderProps) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 text-primary border border-primary/20 magnetic-hover">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export function PremiumCardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-sm', className)} {...props}>
      {children}
    </div>
  )
}

export function PremiumCardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-border', className)} {...props}>
      {children}
    </div>
  )
}
