import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { DndItemComponent } from './dnd-item.component'

type Props = {
  id: string
  children: React.ReactNode
}

export const DndSortableItemComponent = ({ id, children }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <DndItemComponent
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      isDragging={isDragging}
    >
      {children}
    </DndItemComponent>
  )
}
