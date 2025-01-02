import headers from 'next/headers'
import { WretchError } from 'wretch'

import { RequesterApi } from '@/libs/apis/requester.api'
import { GenericException } from '@/libs/exceptions/generic.exception'
import { ErrorCodes } from '@/libs/helpers/error-codes.helper'

import { boardService } from './board.service'

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

describe('BoardService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('get', () => {
    const mockBoard = { id: 1, name: 'Board 1' }

    it('should throw an error if the user is not authenticated', async () => {
      await expect(boardService.authenticateRequest()).rejects.toThrow(
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

      await boardService.authenticateRequest()

      await expect(requesterAuthenticateMock).toHaveBeenCalledWith(
        'test-access-token'
      )
    })

    it('should return board successfully', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.resolve(mockBoard)
      })

      const result = await boardService.get('1')

      expect(result).toEqual(mockBoard)
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.get('1')).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHENTICATED,
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

      await expect(boardService.get('1')).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHORIZED,
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

      await expect(boardService.get('1')).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_NOT_FOUND, 'Board not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.get('1')).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error fetching board')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(boardService.get('1')).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error fetching board')
      )
    })
  })

  describe('getAll', () => {
    const mockBoards = [
      { id: 1, name: 'Board 1' },
      { id: 2, name: 'Board 2' }
    ]

    it('should throw an error if the user is not authenticated', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue(undefined)
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })

      await expect(boardService.authenticateRequest()).rejects.toThrow(
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

      await boardService.authenticateRequest()

      await expect(requesterAuthenticateMock).toHaveBeenCalledWith(
        'test-access-token'
      )
    })

    it('should return boards successfully', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.resolve(mockBoards)
      })

      const result = await boardService.getAll()

      expect(result).toEqual(mockBoards)
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.getAll()).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHENTICATED,
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

      await expect(boardService.getAll()).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHORIZED,
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

      await expect(boardService.getAll()).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_NOT_FOUND, 'Board not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.getAll()).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error fetching boards')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(boardService.getAll()).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error fetching boards')
      )
    })
  })

  describe('create', () => {
    const mockBoard = { name: 'New Board', description: 'Board description' }
    const mockCreatedBoard = { id: 1, ...mockBoard }

    it('should handle error when creating board not authenticated', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue(undefined)
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(
          ErrorCodes.USER_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should create a board successfully', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.resolve(mockCreatedBoard)
      })

      await boardService.authenticateRequest()
      const result = await boardService.create(mockBoard)

      expect(result).toEqual(mockCreatedBoard)
    })

    it('should handle error when creating board', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(new Error('Failed to create board'))
      })

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error creating board')
      )
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHENTICATED,
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

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHORIZED,
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

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_NOT_FOUND, 'Board not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error creating board')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'post').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(boardService.create(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error creating board')
      )
    })
  })

  describe('update', () => {
    const mockBoard = { name: 'New Board' }
    const mockUpdatedBoard = { id: 1, ...mockBoard }

    it('should handle error when updating board not authenticated', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue(undefined)
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(
          ErrorCodes.USER_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should update a board successfully', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.resolve(mockUpdatedBoard)
      })

      await boardService.authenticateRequest()
      const result = await boardService.update(mockBoard)

      expect(result).toEqual(mockUpdatedBoard)
    })

    it('should handle error when updating board', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(new Error('Failed to update board'))
      })

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error updating board')
      )
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHENTICATED,
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

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHORIZED,
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

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_NOT_FOUND, 'Board not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error updating board')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'put').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(boardService.update(mockBoard)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error updating board')
      )
    })
  })

  describe('delete', () => {
    const mockBoardId = '1'

    it('should handle error when updating board not authenticated', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue(undefined)
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(
          ErrorCodes.USER_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should delete a board successfully', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.resolve(true)
      })

      await boardService.authenticateRequest()
      const result = await boardService.delete(mockBoardId)

      expect(result).toEqual(true)
    })

    it('should handle error when deleting board', async () => {
      jest.spyOn(headers, 'cookies').mockImplementation(() => {
        return Promise.resolve({
          get: jest.fn().mockReturnValue({ value: 'test-access-token' })
          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } as any)
      })
      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.reject(new Error('Failed to delete board'))
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error deleting board')
      )
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHENTICATED,
          'User not authenticated'
        )
      )
    })

    it('should handle 403 forbidden error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 403 } as Response

      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(
          ErrorCodes.BOARD_NOT_AUTHORIZED,
          'User not authorized'
        )
      )
    })

    it('should handle 404 not found error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 404 } as Response

      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_NOT_FOUND, 'Board not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error deleting board')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'delete').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(boardService.delete(mockBoardId)).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error deleting board')
      )
    })
  })
})
