import * as Sentry from '@sentry/nextjs'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { cookies } from 'next/headers'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        ;(await cookies()).set('accessToken', account.access_token as string)
      }

      return token
    },
    async session({ session }) {
      if (process.env.NODE_ENV === 'production') {
        const scope = Sentry.getCurrentScope()

        if (session && session.user) {
          scope.setUser({
            id: session.user.id,
            email: session.user.email
          })
        }
      }

      return session
    }
  }
})
