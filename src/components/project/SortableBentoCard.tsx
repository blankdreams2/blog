'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { BentoCard } from './BentoCard'
import { getBentoSize } from '@/consts'
import type { BentoProject } from '@/lib/project-utils'

interface SortableBentoCardProps {
  project: BentoProject
  order: string[]
}

export const SortableBentoCard: React.FC<SortableBentoCardProps> = ({
  project,
  order,
}) => {
  const sortIndex = order.indexOf(project.id)
  const size = getBentoSize(sortIndex)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const gridClass = {
    wide: 'sm:col-span-2',
    tall: 'sm:row-span-2',
    small: '',
  }[size]

  return (
    <div className={cn('min-h-0', gridClass)}>
      <BentoCard
        project={project}
        size={size}
        isDragging={isDragging}
        attributes={attributes as object}
        listeners={listeners as object | undefined}
        setNodeRef={setNodeRef}
        style={style}
      />
    </div>
  )
}
