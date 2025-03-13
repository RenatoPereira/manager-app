import React, { forwardRef } from 'react'

type Props = {
  style: React.CSSProperties
  isDragging: boolean
  children: React.ReactNode
}

export const DndItemComponent = forwardRef(
  (
    { children, isDragging, ...props }: Props,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={`${isDragging && 'pointer-events-none opacity-30'}`}
      >
        {children}
      </div>
    )
  }
)

DndItemComponent.displayName = 'DndItemComponent'
