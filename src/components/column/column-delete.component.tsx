'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { GoTrash } from 'react-icons/go'

import { LoadingComponent } from '@/components/loading'
import { deleteColumn } from '@/libs/actions/column.action'

type Props = {
  columnId: string
}

export const ColumnDeleteComponent = ({ columnId }: Props) => {
  const [state, action, isPending] = useActionState(deleteColumn, null)

  const router = useRouter()

  useEffect(() => {
    if (state) {
      router.refresh()
    }
  }, [state, router])

  return (
    <form action={action}>
      <input
        role="textbox"
        type="hidden"
        name="columnId"
        value={columnId as string}
      />

      <button
        type="submit"
        aria-label="Delete column"
        className={`cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80 text-sm mt-2 ${
          isPending ? 'opacity-100' : 'group-hover/column:opacity-100 opacity-0'
        }`}
        disabled={isPending}
      >
        {isPending ? <LoadingComponent scale={0.5} /> : <GoTrash />}
      </button>
    </form>
  )
}
