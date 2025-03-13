'use client'

import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  Over,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Column } from '@/@types/column.type'
import { Task } from '@/@types/tasks.type'
import { CardTaskComponentProps } from '@/components/card/card-task.component'
import { ColumnComponentProps } from '@/components/column/column.component'
import { getColumnsToUpdate } from '@/libs/helpers/column.helper'
import { taskInsert, taskRemove } from '@/libs/helpers/task.helper'

import { DndContainerComponent } from './dnd-container.component'
import { DndSortableItemComponent } from './dnd-sortable-item.component'

type Props = {
  renderColumn: (props: ColumnComponentProps) => React.ReactNode
  renderTask: (props: CardTaskComponentProps) => React.ReactNode
  items: Column[]
}

export const DndMultipleContainerComponent = ({
  items,
  renderColumn,
  renderTask
}: Props) => {
  const [dndItems, setDndItems] = useState<Column[]>(items)

  const activeColumn = useRef<Column | null>(null)
  const clonedItems = useRef<Column[] | null>(dndItems)

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    const activeColumnId = active.data?.current?.sortable?.containerId

    const { fromColumn } = getColumnsToUpdate(dndItems, activeColumnId)

    const task = fromColumn.tasks.find((task) => task.id === active.id)

    if (!task) {
      return
    }

    activeColumn.current = fromColumn
    clonedItems.current = [...dndItems]
    setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active.id || !over?.id) {
      return
    }

    if (active.id !== over?.id) {
      const activeColumnId = active.data?.current?.sortable?.containerId
      const overColumnId = over.data?.current?.sortable?.containerId

      const { fromColumnIndex, fromColumn, toColumnIndex, toColumn } =
        getColumnsToUpdate(dndItems, activeColumnId, overColumnId)

      if (fromColumn?.id && toColumn?.id) {
        updateDnd(
          fromColumn,
          fromColumnIndex,
          toColumn,
          toColumnIndex as number,
          active,
          over
        )
      }
    }

    resetDnd()
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!active.id || !over?.id) {
      return
    }

    const activeColumnId = active.data?.current?.sortable?.containerId
    const overColumnId =
      over.data?.current?.sortable?.containerId || (over.id as string)

    if (activeColumnId !== overColumnId) {
      const { fromColumnIndex, fromColumn, toColumnIndex, toColumn } =
        getColumnsToUpdate(dndItems, activeColumnId, overColumnId)

      if (fromColumn?.id && toColumn?.id) {
        updateDnd(
          fromColumn,
          fromColumnIndex,
          toColumn,
          toColumnIndex as number,
          active,
          over
        )
      }
    }
  }

  const handleDragCancel = () => {
    if (clonedItems.current) {
      setDndItems(clonedItems.current)
    }

    resetDnd()
  }

  const updateDnd = (
    fromColumn: Column,
    fromColumnIndex: number,
    toColumn: Column,
    toColumnIndex: number,
    active: Active,
    over: Over
  ) => {
    setDndItems((items) => {
      const newItems = [...items]

      const fromIndex = fromColumn.tasks.findIndex(
        (item) => item.id === active.id
      )

      const toIndex = toColumn.tasks.findIndex((item) => item.id === over?.id)

      if (fromColumn.id === toColumn.id) {
        const tasksReordered = arrayMove(fromColumn.tasks, fromIndex, toIndex)

        newItems[fromColumnIndex] = {
          ...fromColumn,
          tasks: tasksReordered
        }
      } else {
        const tasksRemoved = taskRemove(
          fromColumn.tasks,
          fromColumn.tasks[fromIndex]
        )
        newItems[fromColumnIndex] = {
          ...fromColumn,
          tasks: tasksRemoved
        }

        const tasksAdded = taskInsert(
          toColumn.tasks,
          toIndex,
          fromColumn.tasks[fromIndex]
        )
        newItems[toColumnIndex] = {
          ...toColumn,
          tasks: tasksAdded
        }
      }

      return newItems
    })
  }

  const resetDnd = () => {
    activeColumn.current = null
    clonedItems.current = null
    setActiveTask(null)
  }

  const renderColumnWithTasks = (column: Column) => {
    return (
      <DndContainerComponent id={column.id}>
        <SortableContext id={column.id} items={column.tasks}>
          {renderColumn({
            name: column.name,
            id: column.id,
            children: column.tasks.map((task) => (
              <DndSortableItemComponent key={task.id} id={task.id}>
                {renderTask({ task })}
              </DndSortableItemComponent>
            ))
          })}
        </SortableContext>
      </DndContainerComponent>
    )
  }

  useEffect(() => {
    setDndItems(items)
  }, [items])

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {dndItems.map((item) => (
        <div
          className="w-80 shrink-0"
          key={item.id}
          data-testid={`mock-column-${item.id}`}
        >
          {renderColumnWithTasks(item)}
        </div>
      ))}

      {createPortal(
        <DragOverlay adjustScale={false}>
          {activeTask ? renderTask({ task: activeTask }) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
