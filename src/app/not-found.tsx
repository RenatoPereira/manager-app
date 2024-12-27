import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home() {
  const t = useTranslations('NotFound')

  return (
    <section className="size-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-primary">{t('title')}</h1>

      <Link
        href="/"
        className="px-4 py-3 bg-primary text-primary-inverted rounded-md text-sm font-bold uppercase cursor-pointer"
      >
        {t('back')}
      </Link>
    </section>
  )
}
