import { useTranslations } from 'next-intl'

import { signIn } from '@/libs/auth'

export const SignInComponent = () => {
  const t = useTranslations('SignIn')

  return (
    <form
      role="form"
      action={async () => {
        'use server'
        await signIn('google', {
          redirectTo: '/'
        })
      }}
    >
      <button
        type="submit"
        className="p-4 bg-tertiary text-primary-inverted rounded-md text-sm font-bold uppercase cursor-pointer"
      >
        {t('button')}
      </button>
    </form>
  )
}
