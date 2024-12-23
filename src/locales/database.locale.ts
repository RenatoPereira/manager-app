'use server'

import { cookies } from 'next/headers'

import { defaultLocale } from './config.locale'

// This cookie name is used by `next-intl` on the public pages too. By
// reading/writing to this locale, we can ensure that the user's locale
// is consistent across public and private pages. In case you save the
// locale of registered users in a database, you can of course also use
// that instead when the user is logged in.
const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
