import { cookies } from 'next/headers'

import { Column, ColumnRequest } from '@/@types/column.type'
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
              ErrorCodes.COLUMN_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.BOARD_NOT_FOUND,
              'Board not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.COLUMN_UNKNOWN,
              'Error fetching boards'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.COLUMN_UNKNOWN,
        'Error fetching boards'
      )
    }
  }

  async create(column: ColumnRequest): Promise<Column[]> {
    await this.authenticateRequest()

    try {
      const columns = (await this.#requesterApi.post(
        `/columns`,
        column
      )) as Column[]

      return columns

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_FOUND,
              'Column not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.COLUMN_UNKNOWN,
              'Error creating column'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.COLUMN_UNKNOWN,
        'Error creating column'
      )
    }
  }

  async update(column: Partial<Column>): Promise<Column> {
    await this.authenticateRequest()

    try {
      const res = (await this.#requesterApi.put(
        `/columns/${column.id}`,
        column
      )) as Column

      return res

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_FOUND,
              'Column not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.COLUMN_UNKNOWN,
              'Error updating column'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.COLUMN_UNKNOWN,
        'Error updating column'
      )
    }
  }

  async delete(columnId: string): Promise<boolean> {
    await this.authenticateRequest()

    try {
      const res = (await this.#requesterApi.delete(
        `/columns/${columnId}`
      )) as boolean

      return res

      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 401:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHENTICATED,
              'User not authenticated'
            )
          case 403:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_AUTHORIZED,
              'User not authorized'
            )
          case 404:
            throw new GenericException(
              ErrorCodes.COLUMN_NOT_FOUND,
              'Column not found'
            )
          default:
            throw new GenericException(
              ErrorCodes.COLUMN_UNKNOWN,
              'Error deleting column'
            )
        }
      }

      throw new GenericException(
        ErrorCodes.COLUMN_UNKNOWN,
        'Error deleting column'
      )
    }
  }
}

const columnService = new ColumnService()

Object.freeze(columnService)

export { columnService }
