'use server'

import { getTranslations } from 'next-intl/server'

import { LoadingComponent } from '@/components/loading/loading.component'

export const LoadingContainer = async () => {
  const t = await getTranslations('ManagerApp')

  return (
    <section
      role="section"
      className="size-full flex p-6 gap-4 items-center justify-center"
    >
      <LoadingComponent text={t('loading')} />
    </section>
  )
}
