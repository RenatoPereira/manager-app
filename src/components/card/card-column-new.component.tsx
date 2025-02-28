'use client'

import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { HiPlus } from 'react-icons/hi'

import { LoadingComponent } from '@/components/loading'
import { createColumn } from '@/libs/actions/column.action'

export const CardColumnNewComponent = () => {
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
    <form className="w-full pt-1" action={action}>
      <input
        role="textbox"
        type="hidden"
        name="boardId"
        value={params.id as string}
      />
      <button
        type="submit"
        className="w-full flex items-center gap-2 p-4 dark:bg-violet-950/50 border-l-4 border-teal-800/50 dark:border-white/50 hover:bg-teal-50/20 dark:hover:bg-violet-900/30 transition-colors duration-300 rounded-md shadow-md font-medium text-cyan-900 dark:text-white cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <LoadingComponent scale={0.8} />
        ) : (
          <span className="flex items-center gap-1 text-sm">
            <HiPlus /> {t('new-column')}
          </span>
        )}
      </button>
    </form>
  )
}
