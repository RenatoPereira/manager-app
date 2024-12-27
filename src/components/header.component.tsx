import Image from 'next/image'

import { auth } from '@/libs/auth'

import { SignOutComponent } from './auth/sign-out.component'

export const HeaderComponent = async () => {
  const session = await auth()

  return (
    <header className="flex justify-between items-center p-4 bg-cyan-800 dark:bg-highlight shrink-0">
      <h1 className="text-2xl font-bold text-primary-inverted">Manager APP</h1>

      {session?.user && (
        <div className="flex items-center gap-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={32}
              height={32}
              priority
              className="rounded-full"
            />
          )}

          <SignOutComponent />
        </div>
      )}
    </header>
  )
}
