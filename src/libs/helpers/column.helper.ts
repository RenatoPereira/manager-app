import { Column } from '@/@types/column.type'

import { isValidIndex } from './validation.helper'

export const getColumnIndex = (items: Column[], id: string) => {
  return items.findIndex((item) => item.id === id)
}

export const getColumn = (items: Column[], id: string) => {
  return items.find((item) => item.id === id)
}

export const getColumnsToUpdate = (
  items: Column[],
  activeColumnId: string,
  overColumnId?: string
) => {
  const fromColumnIndex = getColumnIndex(items, activeColumnId)
  const fromColumn = { ...items[fromColumnIndex] }

  const toColumnIndex = overColumnId
    ? getColumnIndex(items, overColumnId)
    : undefined
  const toColumn = isValidIndex(toColumnIndex)
    ? { ...items[toColumnIndex as number] }
    : undefined

  return {
    fromColumnIndex,
    fromColumn,
    toColumnIndex,
    toColumn
  }
}
