'use client'

import { useEffect, useState } from 'react'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { cn } from '@/lib/utils'

const getIsDark = () =>
  document.documentElement.getAttribute('data-theme') === 'dark'

export function ActionCenterThemeCard() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(getIsDark())

    const observer = new MutationObserver(() => setIsDark(getIsDark()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = () => setIsDark(getIsDark())
    document.addEventListener('astro:after-swap', handler)
    return () => document.removeEventListener('astro:after-swap', handler)
  }, [])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (e.target instanceof Element && e.target.closest('button')) return
        e.currentTarget.querySelector('button')?.click()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.currentTarget.querySelector('button')?.click()
        }
      }}
      className={cn(
        'relative flex flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-4 transition-colors',
        'bg-muted/30',
        isDark ? 'bg-muted' : 'bg-muted/30',
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center">
        <AnimatedThemeToggler
          data-action-theme-toggle
          className="size-9 shrink-0 rounded-lg"
        />
      </div>
      <div className="text-left text-[13px] font-medium dark:font-normal">
        {isDark ? 'Dark Mode: On' : 'Dark Mode: Off'}
      </div>
    </div>
  )
}
