import { cookies } from 'next/headers'

import { Column } from '@/@types/column.type'
import { RequesterApi } from '@/libs/apis/requester.api'
import { GenericException } from '@/libs/exceptions/generic.exception'
import { ErrorCodes } from '@/libs/helpers/error-codes.helper'

class ColumnService {
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

  async getFromBoard(boardId: string): Promise<Column[]> {
    await this.authenticateRequest()

    try {
      const columns = (await this.#requesterApi.get(
        `/columns?boardId=${boardId}&_embed=tasks`
      )) as Column[]

      return columns

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
}

const columnService = new ColumnService()

Object.freeze(columnService)

export { columnService }
