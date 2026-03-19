'use client'

import { Highlighter } from '@/components/ui/highlighter'
import { DARK_UNDERLINE, LIGHT_UNDERLINE } from '@/consts'
import { Gamepad2, Laptop2 } from 'lucide-react'
import React from 'react'

export interface ParagraphProps {
  tag: string
  answer?: string
  customAnswer?: React.ReactNode
  dir?: 'ltr' | 'rtl'
  children?: React.ReactNode
}

export default function Paragraph({
  tag,
  answer,
  customAnswer,
  dir = 'ltr',
  children,
}: ParagraphProps) {
  const [underlineColor, setUnderlineColor] = React.useState(LIGHT_UNDERLINE)
  const [highlightKey, setHighlightKey] = React.useState(0)

  // Re-trigger highlighter on page load (fixes client-side nav)
  React.useEffect(() => {
    const handler = () => setHighlightKey((k) => k + 1)
    document.addEventListener('astro:page-load', handler)
    return () => document.removeEventListener('astro:page-load', handler)
  }, [])

  // Observe theme changes by watching the `dark` class on the root element
  React.useEffect(() => {
    const getIsDark = () => document.documentElement.classList.contains('dark')
    const apply = () =>
      setUnderlineColor(getIsDark() ? DARK_UNDERLINE : LIGHT_UNDERLINE)
    apply()

    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const tagAlignment = dir === 'rtl' ? 'text-right' : 'text-left'

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-3xl flex-col border-b border-slate-700 pt-1 pb-2 dark:border-slate-400">
        {/* Tag */}
        <p
          className={`pb-2 font-display text-2xl text-black dark:text-white ${tagAlignment}`}
        >
          {tag === 'rpg maker games' && (
            <Gamepad2 className="mt-1 mr-1.5 inline-block h-5 w-5 animate-pulse" />
          )}
          {tag === 'chào, or hi there' && (
            <Laptop2 className="mt-1 mr-1.5 inline-block h-5 w-5" />
          )}
          <Highlighter
            key={highlightKey}
            action="underline"
            color={underlineColor}
            strokeWidth={2}
            isView={false}
          >
            {tag || 'Lorem ipsum dolor sit amet.'}
          </Highlighter>
          {/* {tag || 'Lorem ipsum dolor sit amet.'} */}
        </p>

        {customAnswer || children ? (
          <p
            className={`pb-2 font-sans text-lg font-medium tracking-wide text-black dark:font-light dark:text-muted-foreground ${tagAlignment}`}
          >
            {customAnswer ?? children}
          </p>
        ) : (
          <p className="pb-2 font-sans text-xl text-gray-500 opacity-80 dark:text-muted-foreground">
            {answer ||
              'Consectetur adipiscing elit, sed do eiusmod tempor incididunt.'}
          </p>
        )}
      </div>
    </div>
  )
}
