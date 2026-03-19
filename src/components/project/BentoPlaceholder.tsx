'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

export const BentoPlaceholder: React.FC = () => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <div
      data-bento-placeholder
      className="flex min-h-[10rem] items-center justify-center"
    >
      <button
        type="button"
        onClick={() => setClicked((c) => !c)}
        className={cn(
          'bg-muted/50 hover:bg-muted hover:border-accent focus:ring-accent focus:ring-offset-background flex size-16 items-center justify-center rounded-full border-2 border-dashed transition-all duration-300 hover:scale-110 hover:border-solid focus:ring-2 focus:ring-offset-2 focus:outline-none',
          clicked && 'border-accent bg-accent/20 scale-125',
        )}
        aria-label="Easter egg"
      >
        <span
          className={cn(
            'text-muted-foreground text-2xl transition-transform duration-300',
            clicked && 'rotate-180',
          )}
        >
          ✦
        </span>
      </button>
      <style>{`
        @keyframes bento-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        [data-bento-placeholder] button {
          animation: bento-pulse 2.5s ease-in-out infinite;
        }
        [data-bento-placeholder] button:hover {
          animation: none;
        }
      `}</style>
    </div>
  )
}
