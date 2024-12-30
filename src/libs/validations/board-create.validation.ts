'use server'

import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

const BoardCreateSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable()
})

export type BoardCreateSchema = z.infer<typeof BoardCreateSchema>

export const BoardCreateValidation = async (formData: FormData) => {
  'use server'

  const t = await getTranslations('Validations.BoardCreate')
  const values = Object.fromEntries(formData)

  const result = await BoardCreateSchema.safeParseAsync(values, {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errorMap(issue: any, ctx) {
      let message

      const path = issue.path[0]

      switch (path) {
        case 'name':
          message = t(`name.${issue.code}`, { minimum: issue.minimum })
          break
      }

      return {
        message: message || ctx.defaultError
      }
    }
  })

  return result
}
