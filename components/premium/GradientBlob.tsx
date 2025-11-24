'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GradientBlobProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'accent' | 'mixed'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  animate?: boolean
  blur?: 'sm' | 'md' | 'lg' | 'xl'
}

export function GradientBlob({
  variant = 'primary',
  size = 'lg',
  position = 'center',
  animate = true,
  blur = 'xl',
  className,
  ...props
}: GradientBlobProps) {
  const variants = {
    primary: 'bg-primary/20 dark:bg-primary/30',
    accent: 'bg-accent/20 dark:bg-accent/30',
    mixed: 'bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10'
  }
  
  const sizes = {
    sm: 'w-[300px] h-[300px]',
    md: 'w-[500px] h-[500px]',
    lg: 'w-[800px] h-[800px]',
    xl: 'w-[1000px] h-[1000px]'
  }
  
  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  }
  
  const blurs = {
    sm: 'blur-[60px]',
    md: 'blur-[100px]',
    lg: 'blur-[120px]',
    xl: 'blur-[150px]'
  }
  
  return (
    <div
      className={cn(
        'absolute rounded-full -z-10 pointer-events-none',
        variants[variant],
        sizes[size],
        positions[position],
        blurs[blur],
        animate && 'animate-pulse-glow',
        className
      )}
      {...props}
    />
  )
}

// Preset blob configurations for common use cases
export function HeroBlobs() {
  return (
    <>
      <GradientBlob 
        variant="primary" 
        size="xl" 
        position="top-right" 
        blur="xl"
      />
      <GradientBlob 
        variant="accent" 
        size="lg" 
        position="bottom-left" 
        blur="lg"
      />
    </>
  )
}

export function SectionBlobs() {
  return (
    <>
      <GradientBlob 
        variant="mixed" 
        size="md" 
        position="center" 
        blur="xl"
      />
    </>
  )
}
