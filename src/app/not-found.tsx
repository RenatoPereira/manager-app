import { getTranslations } from 'next-intl/server'

import { GenericErrorComponent } from '@/components/error/generic.component'

export default async function NotFound() {
  const t = await getTranslations('Error')

  return (
    <GenericErrorComponent
      title={t('notFound.title')}
      back={t('notFound.back')}
    />
  )
}
