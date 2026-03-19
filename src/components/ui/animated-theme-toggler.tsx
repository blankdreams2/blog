'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'

import { cn } from '@/lib/utils'

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

const getIsDark = () =>
  document.documentElement.getAttribute('data-theme') === 'dark'

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    setIsSpinning(true)
    setTimeout(() => setIsSpinning(false), 500)

    const newTheme = !isDark
    const apply = () => {
      document.documentElement.setAttribute(
        'data-theme',
        newTheme ? 'dark' : 'light',
      )
      localStorage.setItem('theme', newTheme ? 'dark' : 'light')
      setIsDark(newTheme)
    }

    if (typeof document.startViewTransition === 'function') {
      await document.startViewTransition(() => {
        flushSync(apply)
      }).ready

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    } else {
      apply()
    }
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      type="button"
      title="Toggle theme"
      className={cn(
        'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 inline-flex size-9 items-center justify-center rounded-md transition-transform duration-500 ease-out',
        '[&_svg]:size-4',
        isSpinning && 'animate-[spin_0.5s_ease-in-out]',
        className,
      )}
      {...props}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
