'use client'

import { useActionState } from 'react'

import { CardTaskNewComponent } from '@/components/card/card-task-new.component'
import { InputEditableComponent } from '@/components/inputs/input-editable.component'
import { updateColumn } from '@/libs/actions/column.action'

import { ColumnDeleteComponent } from './column-delete.component'

export type ColumnComponentProps = {
  id: string
  name: string
  children: React.ReactNode
}

export const ColumnComponent = ({
  name,
  id,
  children
}: ColumnComponentProps) => {
  const [state, formAction] = useActionState(updateColumn, {
    data: null,
    errors: null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  return (
    <section
      role="region"
      className="w-full flex flex-col gap-2 bg-emerald-50/10 dark:bg-violet-950/50 rounded-md p-4 pt-2 border-t-4 border-violet-800/30 group/column"
    >
      <div className="px-1 w-full flex items-center justify-between gap-x-2 font-medium text-cyan-800 dark:text-white truncate min-h-11">
        <InputEditableComponent
          name="name"
          value={(state?.data?.get('name') as string) || name}
          onSubmit={formAction}
          textSize="lg"
          hiddenFields={[{ name: 'columnId', value: id }]}
          error={state?.errors}
          width="w-full"
        />

        <ColumnDeleteComponent columnId={id} />
      </div>

      <div className="w-full flex flex-col gap-4">
        {children}
        <CardTaskNewComponent columnId={id} />
      </div>
    </section>
  )
}
