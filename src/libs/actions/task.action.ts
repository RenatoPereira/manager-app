 
'use server'

import { Task, TaskRequest } from '@/@types/tasks.type'
import { taskService } from '@/libs/services/task.service'
import {
  TaskCreateValidation,
  TaskUpdateValidation
} from '@/libs/validations/task.validation'

 

 

 

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const updateTask = async (_: any, formData: FormData) => {
  const result = await TaskUpdateValidation(formData)

  if (!result.success) {
    return {
      data: formData,
      errors: result.error.format()
    }
  }

  const taskData: Partial<Task> = {
    id: formData.get('taskId') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string
  }

  const res = await taskService.update(taskData)

  if (res) {
    return {
      data: formData,
      errors: null
    }
  }
}
