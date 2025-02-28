import { cookies } from 'next/headers'

import { Task, TaskRequest } from '@/@types/tasks.type'
import { RequesterApi } from '@/libs/apis/requester.api'
import { GenericException } from '@/libs/exceptions/generic.exception'
import { ErrorCodes } from '@/libs/helpers/error-codes.helper'

class TaskService {
  #requesterApi: RequesterApi

  constructor() {
    this.#requesterApi = new RequesterApi(`${process.env.BOARD_API_URL}`)
  }

  async authenticateRequest(): Promise<void> {
    const accessToken = (await cookies()).get('accessToken')?.value
    this.#requesterApi.authenticate(accessToken)

    if (!accessToken) {
      throw new GenericException(
        ErrorCodes.USER_NOT_AUTHENTICATED,
        'User not authenticated'
      )
    }
  }

  async get(taskId: string): Promise<Task> {
    await this.authenticateRequest()

    try {
      const task = (await this.#requesterApi.get(`/tasks/${taskId}`)) as Task

      return task

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.TASK_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.TASK_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.TASK_NOT_FOUND,
              'Task not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.TASK_UNKNOWN,
              'Error fetching task'
            )
        }
      }

      throw new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error fetching task')
    }
  }

  async create(task: TaskRequest): Promise<Task[]> {
    await this.authenticateRequest()

    try {
      const tasks = (await this.#requesterApi.post(`/tasks`, task)) as Task[]

      return tasks

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.TASK_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.TASK_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.TASK_NOT_FOUND,
              'Task not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.TASK_UNKNOWN,
              'Error creating task'
            )
        }
      }

      throw new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error creating task')
    }
  }

  async update(task: Partial<Task>): Promise<Task> {
    await this.authenticateRequest()

    try {
      const res = (await this.#requesterApi.put(
        `/tasks/${task.id}`,
        task
      )) as Task

      return res

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.TASK_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.TASK_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.TASK_NOT_FOUND,
              'Task not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.TASK_UNKNOWN,
              'Error updating task'
            )
        }
      }

      throw new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error updating task')
    }
  }
}

const taskService = new TaskService()

Object.freeze(taskService)

export { taskService }
