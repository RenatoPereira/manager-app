'use server'

import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

const TaskCreateSchema = z.object({
  columnId: z.string(),
  name: z.string().min(3)
})

export type TaskCreateSchema = z.infer<typeof TaskCreateSchema>

export const TaskCreateValidation = async (formData: FormData) => {
  'use server'

  const t = await getTranslations('Validations.TaskCreate')
  const values = Object.fromEntries(formData)

  const result = await TaskCreateSchema.safeParseAsync(values, {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errorMap(issue: any, ctx) {
      let message

      const path = issue.path[0]

      switch (path) {
        case 'name':
          message = t(`name.${issue.code}`, { minimum: issue.minimum })
          break
        case 'columnId':
          message = t(`columnId.${issue.code}`)
          break
      }

      return {
        message: message || ctx.defaultError
      }
    }
  })

  return result
}
