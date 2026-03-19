'use client'

import { GripVertical } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'
import type { BentoProject } from '@/lib/project-utils'

export type BentoSize = 'wide' | 'small' | 'tall'

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23999" width="400" height="300"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24"%3Eplaceholder%3C/text%3E%3C/svg%3E'

const formatDate = (iso: string | null): string => {
  if (!iso) return ''
  const d = new Date(iso)
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

interface BentoCardProps {
  project: BentoProject
  size: BentoSize
  isDragging: boolean
  attributes: object
  listeners: object | undefined
  setNodeRef: (el: HTMLElement | null) => void
  style: React.CSSProperties
}

export const BentoCard: React.FC<BentoCardProps> = ({
  project,
  size,
  isDragging,
  attributes,
  listeners,
  setNodeRef,
  style,
}) => {
  const isWide = size === 'wide'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group bg-background relative flex h-full min-h-0 overflow-visible rounded-xl border transition-shadow',
        isDragging && 'z-50 opacity-90 shadow-xl',
        !isDragging && 'hover:bg-muted/50 hover:shadow-md',
      )}
    >
      <a
        href={project.caseStudy ? `/project/${project.id}` : project.link}
        target={project.caseStudy ? undefined : '_blank'}
        rel={project.caseStudy ? undefined : 'noopener noreferrer'}
        className={cn(
          'relative flex h-full min-h-0 overflow-hidden',
          isWide && 'flex-col gap-2 p-4 sm:flex-row sm:gap-3',
          size === 'tall' && 'flex-col gap-2 p-3',
          size === 'small' &&
            'flex-col gap-1.5 p-3 sm:flex-row sm:gap-2 sm:p-4',
        )}
      >
        <div
          className={cn(
            'bg-muted flex shrink-0 items-center justify-center overflow-hidden rounded-lg',
            isWide &&
              'aspect-video w-full sm:h-full sm:min-h-0 sm:w-56 sm:max-w-[45%] sm:flex-1',
            size === 'tall' &&
              'aspect-video w-full sm:h-28 sm:min-h-0 sm:flex-1',
            size === 'small' && 'aspect-video w-full sm:h-20 sm:w-28',
          )}
        >
          <img
            src={project.image ?? PLACEHOLDER_IMAGE}
            alt={project.name}
            className="size-full object-cover"
          />
        </div>
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
          <h3
            className={cn(
              'font-medium',
              isWide ? 'text-lg sm:text-xl' : 'text-sm sm:text-base',
            )}
          >
            {project.name}
          </h3>
          <p
            className={cn(
              'text-muted-foreground leading-relaxed',
              isWide
                ? 'mt-2 line-clamp-2 text-xs sm:line-clamp-3 sm:text-sm'
                : 'mt-1.5 line-clamp-2 text-xs',
            )}
          >
            {project.description}
          </p>
          {(project.startDate || project.endDate) && (
            <p className="text-muted-foreground/70 mt-2 flex items-center gap-x-1.5 text-xs">
              <span>
                {formatDate(project.startDate)}
                {project.endDate
                  ? ` → ${formatDate(project.endDate)}`
                  : ' → Present'}
              </span>
            </p>
          )}
          {project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.slice(0, isWide ? 6 : 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="text-muted-foreground group-hover:text-accent mt-3 inline-flex items-center gap-1 text-xs transition-colors">
            {project.caseStudy ? 'Read case study' : 'Visit'}
            <svg
              className="size-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  project.caseStudy
                    ? 'M9 5l7 7-7 7'
                    : 'M7 17L17 7M17 7H7M17 7v10'
                }
              />
            </svg>
          </span>
        </div>
      </a>
      {/* Floating image pops out on top of the card on hover */}
      <img
        src={project.image ?? PLACEHOLDER_IMAGE}
        alt=""
        aria-hidden
        className="border-border bg-background pointer-events-none absolute top-0 left-1/2 z-30 w-48 -translate-x-1/2 -translate-y-2 rounded-lg border object-cover opacity-0 shadow-xl transition-all duration-300 ease-out group-hover:-translate-y-4 group-hover:opacity-100"
      />
      <button
        type="button"
        className="hover:bg-muted/80 absolute top-3 right-3 z-20 rounded-md p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Drag to reorder"
        {...(attributes as object)}
        {...(listeners ?? {})}
      >
        <GripVertical className="text-muted-foreground size-4" />
      </button>
    </div>
  )
}
