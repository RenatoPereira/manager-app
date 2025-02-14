'use server'

import { TaskRequest } from '@/@types/tasks.type'
import { taskService } from '@/libs/services/task.service'
import { TaskCreateValidation } from '@/libs/validations/task.validation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTask = async (_: any, formData: FormData) => {
  const columnId = formData.get('columnId') as string
  const name = formData.get('name') as string

  const task: TaskRequest = {
    columnId,
    name
  }

  const result = await TaskCreateValidation(formData)

  if (!result.success) {
    return {
      data: formData,
      errors: result.error.format()
    }
  }

  return await taskService.create(task)
}
