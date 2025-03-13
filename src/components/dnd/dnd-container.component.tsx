import { useDroppable } from '@dnd-kit/core'

import { DndItemComponent } from './dnd-item.component'

type Props = {
  id: string
  children: React.ReactNode
}

export const DndContainerComponent = ({ id, children }: Props) => {
  const { setNodeRef } = useDroppable({
    id
  })

  return (
    <DndItemComponent ref={setNodeRef} style={{}} isDragging={false}>
      {children}
    </DndItemComponent>
  )
}
