import { useTranslations } from 'next-intl'

import { signOut } from '@/libs/auth'

export const SignOutComponent = () => {
  const t = useTranslations('SignOut')

  return (
    <form
      role="form"
      action={async () => {
        'use server'
        await signOut({
          redirectTo: '/login'
        })
      }}
    >
      <button
        type="submit"
        className="text-primary-inverted text-xs cursor-pointer"
      >
        {t('button')}
      </button>
    </form>
  )
}
