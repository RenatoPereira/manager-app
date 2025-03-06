'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'

import { Task } from '@/@types/tasks.type'
import { ButtonComponent } from '@/components/buttons/button.component'
import { InputEditableComponent } from '@/components/inputs/input-editable.component'
import { ModalComponent } from '@/components/modal/modal.component'
import { updateTask } from '@/libs/actions/task.action'
import { compareStringsInsensitive } from '@/libs/helpers/string.helper'

import { TextareaWysiwygEditableComponent } from '../inputs/textarea-wysiwyg-editable.component'

type Props = {
  task: Task
}

export const TaskComponent = ({ task }: Props) => {
  const t = useTranslations('Task')

  const [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

  const [state, formAction] = useActionState(updateTask, {
    data: null,
    errors: null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  const onClose = () => {
    setIsOpen(false)
    router.push(`/boards/${task.boardId}`)
  }
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2 w-3xl max-w-full items-start text-cyan-800 dark:text-white">
        <InputEditableComponent
          name="name"
          value={task.name}
          onSubmit={formAction}
          textSize="lg"
          width="w-full"
          hiddenFields={[{ name: 'taskId', value: task.id }]}
          error={state?.errors}
        />

        <div className="flex gap-4 w-full border-t border-cyan-800 dark:border-white/50 pt-8">
          <div className="flex flex-col gap-2 w-3/4">
            <TextareaWysiwygEditableComponent
              name="description"
              placeholder="Description"
              value={task.description || ''}
              error={state?.errors}
              onSubmit={formAction}
              hiddenFields={[{ name: 'taskId', value: task.id }]}
            />
          </div>

          <div className="flex flex-col items-start gap-4 w-1/4">
            <div className="flex gap-2 w-full">
              <ButtonComponent
                label={t('priority.low')}
                variant={
                  compareStringsInsensitive(task.priority, 'low')
                    ? 'primary'
                    : 'secondary'
                }
                disabled={compareStringsInsensitive(task.priority, 'low')}
                fullWidth={true}
              />
              <ButtonComponent
                label={t('priority.medium')}
                variant={
                  compareStringsInsensitive(task.priority, 'medium')
                    ? 'primary'
                    : 'secondary'
                }
                disabled={compareStringsInsensitive(task.priority, 'medium')}
                fullWidth={true}
              />
              <ButtonComponent
                label={t('priority.high')}
                variant={
                  compareStringsInsensitive(task.priority, 'high')
                    ? 'primary'
                    : 'secondary'
                }
                disabled={compareStringsInsensitive(task.priority, 'high')}
                fullWidth={true}
              />
            </div>

            <ButtonComponent
              label={t('buttons.finish')}
              variant="secondary"
              disabled={compareStringsInsensitive(task.status, 'done')}
            />
            <ButtonComponent label={t('buttons.delete')} variant="danger" />
          </div>
        </div>
      </div>
    </ModalComponent>
  )
}
