'use server'

import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

const TaskCreateSchema = z.object({
  columnId: z.string(),
  boardId: z.string(),
  name: z.string().min(3)
})

const TaskUpdateSchema = z.object({
  taskId: z.string(),
  name: z.string().min(3).optional(),
  description: z.string().min(3).optional()
})

export type TaskCreateSchema = z.infer<typeof TaskCreateSchema>
export type TaskUpdateSchema = z.infer<typeof TaskUpdateSchema>

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
        case 'boardId':
          message = t(`boardId.${issue.code}`)
          break
      }

      return {
        message: message || ctx.defaultError
      }
    }
  })

  return result
}

export const TaskUpdateValidation = async (formData: FormData) => {
  'use server'

  const t = await getTranslations('Validations.TaskUpdate')
  const values = Object.fromEntries(formData)

  const result = await TaskUpdateSchema.safeParseAsync(values, {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    errorMap(issue: any, ctx) {
      let message

      const path = issue.path[0]

      switch (path) {
        case 'name':
          message = t(`name.${issue.code}`, { minimum: issue.minimum })
          break
        case 'description':
          message = t(`description.${issue.code}`, { minimum: issue.minimum })
          break
        case 'taskId':
          message = t(`taskId.${issue.code}`)
          break
      }

      return {
        message: message || ctx.defaultError
      }
    }
  })

  return result
}
