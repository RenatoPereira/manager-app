'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { InputComponent } from '@/components/inputs/input.component'
import { SubmitComponent } from '@/components/inputs/submit.component'
import { TextareaComponent } from '@/components/inputs/textarea.component'
import { createBoard } from '@/libs/actions/board-create.action'

export const BoardNewContainer = () => {
  const t = useTranslations('BoardsNew')

  const [state, formAction, pending] = useActionState(createBoard, undefined)

  return (
    <section className="w-full max-w-xl mx-auto flex flex-col gap-10 p-20 items-center justify-center">
      <h1 className="text-3xl font-bold text-cyan-900 dark:text-white">
        {t('title')}
      </h1>

      <form
        className="w-full flex flex-col gap-6"
        role="form"
        action={formAction}
      >
        <InputComponent
          defaultValue={state?.data?.get('name') as string}
          label={t('name.label')}
          name="name"
          placeholder={t('name.placeholder')}
          error={state?.errors?.name?._errors}
        />
        <TextareaComponent
          defaultValue={state?.data?.get('description') as string}
          label={t('description.label')}
          name="description"
          placeholder={t('description.placeholder')}
          error={state?.errors?.description?._errors}
        />
        <SubmitComponent
          label={t('button')}
          disabled={pending}
          loading={pending}
        />
      </form>
    </section>
  )
}
