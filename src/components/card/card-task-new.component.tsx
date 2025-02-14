'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'

import { InputEditableComponent } from '@/components/inputs/input-editable.component'
import { createTask } from '@/libs/actions/task.action'

type Props = {
  columnId: string
}

export const CardTaskNewComponent = ({ columnId }: Props) => {
  const t = useTranslations('CreateTask')

  const [creatingTask, setCreatingTask] = useState(false)
  const [state, formAction] = useActionState(createTask, {
    data: null,
    errors: null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  const router = useRouter()

  useEffect(() => {
    if (state) {
      router.refresh()
    }
  }, [state, router])

  return creatingTask ? (
    <div className="flex flex-col gap-2 p-4 dark:bg-violet-950/50 border-l-4 border-violet-800/50 hover:bg-teal-50/20 dark:hover:bg-violet-900/30 transition-colors duration-300 rounded-md shadow-md font-medium text-cyan-900 dark:text-white">
      <InputEditableComponent
        name="name"
        value={(state?.data?.get('name') as string) || ''}
        onSubmit={formAction}
        textSize="xs"
        hiddenFields={[{ name: 'columnId', value: columnId }]}
        error={state?.errors}
        width="w-full"
        opened={creatingTask}
        onCancel={() => setCreatingTask(false)}
      />
    </div>
  ) : (
    <button
      type="button"
      className="flex items-center gap-1 p-3 dark:bg-violet-950/50 border-l-4 border-teal-800/50 dark:border-white/50 hover:bg-teal-50/20 dark:hover:bg-violet-900/30 transition-colors duration-300 rounded-md shadow-md font-medium text-cyan-900 dark:text-white text-xs"
      onClick={() => setCreatingTask(true)}
    >
      <HiPlus />
      <span className="text-xs">{t('create')}</span>
    </button>
  )
}
