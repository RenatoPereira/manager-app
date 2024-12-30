import headers from 'next/headers'
import { WretchError } from 'wretch'

import { RequesterApi } from '@/libs/apis/requester.api'
import { GenericException } from '@/libs/exceptions/generic.exception'
import { ErrorCodes } from '@/libs/helpers/error-codes.helper'

import { columnService } from './column.service'

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

describe('ColumnService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('get', () => {
    const mockBoard = { id: 1, name: 'Board 1' }

    it('should throw an error if the user is not authenticated', async () => {
      await expect(columnService.authenticateRequest()).rejects.toThrow(
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

      await columnService.authenticateRequest()

      await expect(requesterAuthenticateMock).toHaveBeenCalledWith(
        'test-access-token'
      )
    })

    it('should return board successfully', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.resolve(mockBoard)
      })

      const result = await columnService.getFromBoard('1')

      expect(result).toEqual(mockBoard)
    })

    it('should handle 401 unauthorized error', async () => {
      const error = new Error() as WretchError
      error.response = { status: 401 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(columnService.getFromBoard('1')).rejects.toThrow(
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

      await expect(columnService.getFromBoard('1')).rejects.toThrow(
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

      await expect(columnService.getFromBoard('1')).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_NOT_FOUND, 'Board not found')
      )
    })

    it('should handle unknown WretchError', async () => {
      const error = new Error() as WretchError
      error.response = { status: 500 } as Response

      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(error)
      })

      await expect(columnService.getFromBoard('1')).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error fetching boards')
      )
    })

    it('should handle generic error', async () => {
      jest.spyOn(RequesterApi.prototype, 'get').mockImplementation(() => {
        return Promise.reject(new Error('Generic error'))
      })

      await expect(columnService.getFromBoard('1')).rejects.toThrow(
        new GenericException(ErrorCodes.BOARD_UNKNOWN, 'Error fetching boards')
      )
    })
  })
})
