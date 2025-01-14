import { cookies } from 'next/headers'

import { Board, BoardRequest } from '@/@types/board.typr'
import { RequesterApi } from '@/libs/apis/requester.api'
import { GenericException } from '@/libs/exceptions/generic.exception'
import { ErrorCodes } from '@/libs/helpers/error-codes.helper'

class BoardService {
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

  async get(boardId: string): Promise<Board> {
    await this.authenticateRequest()

    try {
      const board = (await this.#requesterApi.get(
        `/boards/${boardId}`
      )) as Board

      return board

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_FOUND,
              'Board not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.BOARD_UNKNOWN,
              'Error fetching board'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.BOARD_UNKNOWN,
        'Error fetching board'
      )
    }
  }

  async getAll(): Promise<Board[]> {
    await this.authenticateRequest()

    try {
      const boards = (await this.#requesterApi.get('/boards')) as Board[]

      return boards

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_FOUND,
              'Board not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.BOARD_UNKNOWN,
              'Error fetching boards'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.BOARD_UNKNOWN,
        'Error fetching boards'
      )
    }
  }

  async create(board: BoardRequest): Promise<Board> {
    await this.authenticateRequest()

    try {
      const res = (await this.#requesterApi.post('/boards', board)) as Board

      return res

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_FOUND,
              'Board not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.BOARD_UNKNOWN,
              'Error creating board'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.BOARD_UNKNOWN,
        'Error creating board'
      )
    }
  }

  async update(board: Partial<Board>): Promise<Board> {
    await this.authenticateRequest()

    try {
      const res = (await this.#requesterApi.put(
        `/boards/${board.id}`,
        board
      )) as Board

      return res

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_FOUND,
              'Board not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.BOARD_UNKNOWN,
              'Error updating board'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.BOARD_UNKNOWN,
        'Error updating board'
      )
    }
  }

  async delete(boardId: string): Promise<boolean> {
    await this.authenticateRequest()

    try {
      const res = (await this.#requesterApi.delete(
        `/boards/${boardId}`
      )) as boolean

      return res

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_FOUND,
              'Board not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.BOARD_UNKNOWN,
              'Error deleting board'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.BOARD_UNKNOWN,
        'Error deleting board'
      )
    }
  }
}

const boardService = new BoardService()

Object.freeze(boardService)

export { boardService }
