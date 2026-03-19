import { arrayMove } from '@dnd-kit/sortable'
import type { DragEndEvent } from '@dnd-kit/core'
import * as React from 'react'
import type { BentoProject } from '@/lib/project-utils'

interface UseBentoOrderOptions {
  projects: BentoProject[]
  storageKey?: string
}

export const useBentoOrder = ({
  projects,
  storageKey = 'project-order',
}: UseBentoOrderOptions) => {
  const [order, setOrder] = React.useState<string[]>(() => {
    if (typeof window === 'undefined') return projects.map((p) => p.id)
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        const valid = parsed.filter((id) => projects.some((p) => p.id === id))
        const newIds = projects
          .filter((p) => !valid.includes(p.id))
          .map((p) => p.id)
        return [...valid, ...newIds]
      }
    } catch {
      // ignore
    }
    return projects.map((p) => p.id)
  })

  React.useEffect(() => {
    const newIds = projects
      .filter((p) => !order.includes(p.id))
      .map((p) => p.id)
    if (newIds.length > 0) {
      setOrder((prev) => [...prev, ...newIds])
    }
  }, [projects, order])

  const orderedProjects = React.useMemo(() => {
    const byId = new Map(projects.map((p) => [p.id, p]))
    return order.map((id) => byId.get(id)).filter(Boolean) as BentoProject[]
  }, [projects, order])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setOrder((prev) => {
      const oldIndex = prev.indexOf(active.id as string)
      const newIndex = prev.indexOf(over.id as string)
      if (oldIndex === -1 || newIndex === -1) return prev
      const next = arrayMove(prev, oldIndex, newIndex)
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  return { order, orderedProjects, handleDragEnd }
}
