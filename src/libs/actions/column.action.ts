'use server'

import { Column, ColumnRequest } from '@/@types/column.type'
import { columnService } from '@/libs/services/column.service'

import { ColumnUpdateValidation } from '../validations/column.validation'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const createColumn = async (_: any, formData: FormData) => {
  const boardId = formData.get('boardId') as string

  const column: ColumnRequest = {
    boardId,
    name: 'New Column',
    order: 0,
    tasks: []
  }

  return await columnService.create(column)
}

export const updateColumn = async (_: any, formData: FormData) => {
  const result = await ColumnUpdateValidation(formData)

  if (!result.success) {
    return {
      data: formData,
      errors: result.error.format()
    }
  }

  const columnData: Partial<Column> = {
    id: formData.get('columnId') as string,
    name: formData.get('name') as string
  }

  const res = await columnService.update(columnData)

  if (res) {
    return {
      data: formData,
      errors: null
    }
  }
}
