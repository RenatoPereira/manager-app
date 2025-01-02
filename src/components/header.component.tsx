import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

import { auth, signOut } from '@/libs/auth'

import { DropdownComponent } from './dropdown.component'

export const HeaderComponent = async () => {
  const session = await auth()
  const t = await getTranslations('SignOut')

  const userOptions = [
    {
      label: t('button'),
      action: async () => {
        'use server'

        await signOut({
          redirectTo: '/login'
        })
      }
    }
  ]

  return (
    <header className="flex justify-between items-center sticky top-0 p-4 px-6 bg-cyan-700/75 dark:bg-indigo-950/90 shrink-0 z-50">
      <h1 className="text-2xl font-bold text-primary-inverted">
        <Link href="/">Manager APP</Link>
      </h1>

      {session?.user && (
        <DropdownComponent options={userOptions}>
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={32}
              height={32}
              priority
              className="rounded-full"
            />
          ) : (
            <span className="flex items-center justify-center size-8 bg-primary-inverted rounded-full text-primary-inverted uppercase">
              {session.user.name?.charAt(0)}
            </span>
          )}
        </DropdownComponent>
      )}
    </header>
  )
}
