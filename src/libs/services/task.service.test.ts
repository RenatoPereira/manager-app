import headers from 'next/headers'
import { WretchError } from 'wretch'

import { RequesterApi } from '@/libs/apis/requester.api'
import { GenericException } from '@/libs/exceptions/generic.exception'
import { ErrorCodes } from '@/libs/helpers/error-codes.helper'

import { taskService } from './task.service'

jest.mock('next/headers', () => {
  return {
    cookies: () => {
      return {
        get: jest.fn().mockReturnValue(undefined)
      }
    }
  }
})
jest.mock('@/libs/apis/requester.api')

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('get', () => {
    const mockBoard = { id: 1, name: 'Board 1' }

    it('should throw an error if the user is not authenticated', async () => {
      await expect(taskService.authenticateRequest()).rejects.toThrow(
        new GenericException(
          ErrorCodes.USER_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should authenticate the user', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })

      const requesterAuthenticateMock = jest.spyOn(
        RequesterApi.prototype,
        'authenticate'
      )

      await taskService.authenticateRequest()

      await expect(requesterAuthenticateMock).toHaveBeenCalledWith(
        'test-access-token'
      )
    })

    it('should return board successfully', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.resolve(mockBoard)
      })

      const result = await taskService.get('1')

      expect(result).toEqual(mockBoard)
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.get('1')).rejects.toThrow(
        new GenericException(
          ErrorCodes.TASK_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should handle 403 forbidden error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 403 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.get('1')).rejects.toThrow(
        new GenericException(
          ErrorCodes.TASK_NOT_AUTHORIZED,
          'User not authorized'
        )
      )
    })

    it('should handle 404 not found error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 404 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.get('1')).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_NOT_FOUND, 'Task not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.get('1')).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error fetching task')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(taskService.get('1')).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error fetching task')
      )
    })
  })

  describe('create', () => {
    const mockTask = {
      name: 'New Task',
      columnId: 'test-column-id',
      boardId: 'test-board-id'
    }
    const mockCreatedTask = { id: 1, ...mockTask }

    it('should handle error when creating task not authenticated', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue(undefined)
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(
          ErrorCodes.USER_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should create a task successfully', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.resolve(mockCreatedTask)
      })

      await taskService.authenticateRequest()
      const result = await taskService.create(mockTask)

      expect(result).toEqual(mockCreatedTask)
    })

    it('should handle error when creating task', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(new Error('Failed to create task'))
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error creating task')
      )
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(
          ErrorCodes.TASK_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should handle 403 forbidden error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 403 } as Response

      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(
          ErrorCodes.TASK_NOT_AUTHORIZED,
          'User not authorized'
        )
      )
    })

    it('should handle 404 not found error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 404 } as Response

      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_NOT_FOUND, 'Task not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error creating task')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(taskService.create(mockTask)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error creating task')
      )
    })
  })

  describe('update', () => {
    const mockTaskUpdate = { id: '1', name: 'Updated Task' }
    const mockUpdatedTask = {
      id: '1',
      name: 'Updated Task',
      columnId: '1',
      tasks: []
    }

    it('should update task successfully', async () => {
      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.resolve(mockUpdatedTask)
      })

      const result = await taskService.update(mockTaskUpdate)

      expect(result).toEqual(mockUpdatedTask)
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.update(mockTaskUpdate)).rejects.toThrow(
        new GenericException(
          ErrorCodes.TASK_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should handle 403 forbidden error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 403 } as Response

      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.update(mockTaskUpdate)).rejects.toThrow(
        new GenericException(
          ErrorCodes.TASK_NOT_AUTHORIZED,
          'User not authorized'
        )
      )
    })

    it('should handle 404 not found error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 404 } as Response

      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.update(mockTaskUpdate)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_NOT_FOUND, 'Task not found')
      )
    })

    it('should handle 500 internal server error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(taskService.update(mockTaskUpdate)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error updating task')
      )
    })

    it('should handle unknown error', async () => {
      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(taskService.update(mockTaskUpdate)).rejects.toThrow(
        new GenericException(ErrorCodes.TASK_UNKNOWN, 'Error updating task')
      )
    })
  })
})
