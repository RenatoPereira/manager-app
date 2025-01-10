'use server'

import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

const ColumnUpdateSchema = z.object({
  name: z.string().min(3)
})

export type ColumnUpdateSchema = z.infer<typeof ColumnUpdateSchema>

export const ColumnUpdateValidation = async (formData: FormData) => {
  'use server'

  const t = await getTranslations('Validations.ColumnUpdate')
  const values = Object.fromEntries(formData)

  const result = await ColumnUpdateSchema.safeParseAsync(values, {
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
