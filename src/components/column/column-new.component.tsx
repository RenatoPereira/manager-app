'use client'

import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'

import { createColumn } from '@/libs/actions/column.action'

import { LoadingComponent } from '../loading'

export const ColumnNewComponent = () => {
  const t = useTranslations('BoardDetails')

  const [state, action, isPending] = useActionState(createColumn, null)

  const router = useRouter()
  const params = useParams()

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
        name="boardId"
        value={params.id as string}
      />
      <button
        type="submit"
        className="card-board card-board flex flex-col items-center justify-center p-6 gap-2 rounded-lg w-full aspect-video border-2 border-cyan-800/50 dark:border-white/50 text-cyan-900 dark:text-white text-5xl opacity-80 hover:opacity-100 transition-opacity duration-300"
        disabled={isPending}
      >
        {isPending ? (
          <LoadingComponent scale={0.8} />
        ) : (
          <>
            <HiPlus />
            <p className="text-base font-bold">{t('new-column')}</p>
          </>
        )}
      </button>
    </form>
  )
}
