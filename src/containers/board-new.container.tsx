'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { InputComponent } from '@/components/inputs/input.component'
import { SubmitComponent } from '@/components/inputs/submit.component'
import { TextareaComponent } from '@/components/inputs/textarea.component'

type State = {
  error?: {
    name: string
    description: string
  }
}

export const BoardNewContainer = () => {
  const t = useTranslations('BoardsNew')
  const initialState: State = {}

  const [state, formAction, pending] = useActionState(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    return {
      error: {
        name: 'Name is required',
        description: 'Description is required'
      }
    }
  }, initialState)

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
          label={t('name.label')}
          name="name"
          placeholder={t('name.placeholder')}
          error={state?.error?.name}
        />
        <TextareaComponent
          label={t('description.label')}
          name="description"
          placeholder={t('description.placeholder')}
          error={state?.error?.description}
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
