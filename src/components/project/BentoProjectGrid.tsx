import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useBentoOrder } from '@/hooks/useBentoOrder'
import type { BentoProject } from '@/lib/project-utils'
import { BentoPlaceholder } from './BentoPlaceholder'
import { SortableBentoCard } from './SortableBentoCard'

interface BentoProjectGridProps {
  projects: BentoProject[]
  storageKey?: string
}

export const BentoProjectGrid: React.FC<BentoProjectGridProps> = ({
  projects,
  storageKey = 'project-order',
}) => {
  const { order, orderedProjects, handleDragEnd } = useBentoOrder({
    projects,
    storageKey,
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <div
          className="grid auto-rows-[minmax(10rem,1fr)] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          role="list"
        >
          {orderedProjects.map((project) => (
            <SortableBentoCard
              key={project.id}
              project={project}
              order={order}
            />
          ))}
          <BentoPlaceholder />
        </div>
      </SortableContext>
    </DndContext>
  )
}
