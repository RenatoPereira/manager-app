'use client'

import { useActionState } from 'react'

import { Task } from '@/@types/tasks.type'
import { updateColumn } from '@/libs/actions/column.action'

import { CardTaskComponent } from '../card/card-task.component'
import { InputEditableComponent } from '../inputs/input-editable.component'

type Props = {
  id: string
  name: string
  tasks: Task[]
}

export const ColumnComponent = ({ name, tasks, id }: Props) => {
  const [state, formAction] = useActionState(updateColumn, {
    data: null,
    errors: null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  return (
    <section
      role="region"
      className="w-full flex flex-col gap-2 dark:bg-violet-950/50 rounded-lg p-4 border border-violet-800/30"
    >
      <div className="px-1 w-full flex items-center justify-between font-medium text-cyan-800 dark:text-white truncate min-h-11">
        <InputEditableComponent
          name="name"
          value={(state?.data?.get('name') as string) || name}
          onSubmit={formAction}
          textSize="lg"
          hiddenFields={[{ name: 'columnId', value: id }]}
          error={state?.errors}
          width="w-full"
        />
      </div>

      <div className="w-full flex flex-col gap-4">
        {tasks?.map((task) => <CardTaskComponent task={task} key={task.id} />)}
      </div>
    </section>
  )
}
