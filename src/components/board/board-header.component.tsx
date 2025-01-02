'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useTransition } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

import { Board } from '@/@types/board.typr'
import { DropdownComponent } from '@/components/dropdown.component'
import { InputEditableComponent } from '@/components/inputs/input-editable.component'
import { LoadingComponent } from '@/components/loading/loading.component'
import { deleteBoard, updateBoard } from '@/libs/actions/board.action'

type Props = {
  board: Board
}

export const BoardHeaderComponent = ({ board }: Props) => {
  const t = useTranslations('BoardDetails')

  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(updateBoard, {
    data: null,
    errors: null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  const settingsOptions = [
    {
      label: t('settings.delete'),
      action: async () => {
        startTransition(() => {
          deleteBoard(board.id)
        })
      },
      criticalAction: true
    }
  ]

  return (
    <h1 className="flex items-center content-center gap-2 w-full justify-between text-2xl font-medium text-cyan-800 dark:text-white">
      <InputEditableComponent
        name="name"
        value={(state?.data?.get('name') as string) || board.name}
        onSubmit={formAction}
        textSize="2xl"
        hiddenFields={[{ name: 'boardId', value: board.id }]}
        error={state?.errors}
      />

      {isPending ? (
        <LoadingComponent scale={0.6} />
      ) : (
        <DropdownComponent options={settingsOptions}>
          <IoSettingsOutline />
        </DropdownComponent>
      )}
    </h1>
  )
}
