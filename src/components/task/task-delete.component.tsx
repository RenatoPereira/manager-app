'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

import { Task } from '@/@types/tasks.type'
import { ButtonComponent } from '@/components/buttons/button.component'
import { LoadingComponent } from '@/components/loading/loading.component'
import { ModalConfirmComponent } from '@/components/modal/modal-confirm.component'
import { deleteTask } from '@/libs/actions/task.action'

type Props = {
  task: Task
}

export const TaskDeleteComponent = ({ task }: Props) => {
  const t = useTranslations('Task')

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const onConfirm = () => {
    startTransition(async () => {
      const res = await deleteTask(task)

      if (res) {
        router.replace(`/boards/${task.boardId}`)
      }
    })
  }

  const handleOpen = () => {
    setIsConfirmOpen(true)
  }

  const onCancel = useCallback(() => {
    setIsConfirmOpen(false)
  }, [])

  return isPending ? (
    <div className="w-full flex justify-center items-center mt-2">
      <LoadingComponent scale={0.4} />
    </div>
  ) : (
    <>
      <ButtonComponent
        label={t('buttons.delete')}
        variant="danger"
        action={handleOpen}
      />

      <ModalConfirmComponent
        title={t('delete.title')}
        description={t('delete.description', { taskName: task.name })}
        isOpen={isConfirmOpen}
        onConfirm={onConfirm}
        onClose={onCancel}
      />
    </>
  )
}
