import { Column } from '@/@types/column.type'

import { getColumn, getColumnIndex, getColumnsToUpdate } from './column.helper'

describe('getColumnIndex', () => {
  const columns: Column[] = [
    { id: '1', name: 'Column 1', order: 1, tasks: [], boardId: '1' },
    { id: '2', name: 'Column 2', order: 2, tasks: [], boardId: '1' },
    { id: '3', name: 'Column 3', order: 3, tasks: [], boardId: '1' }
  ]

  describe('getColumnIndex', () => {
    it('should return the index of the column', () => {
      const index = getColumnIndex(columns, '2')

      expect(index).toBe(1)
    })

    it('should return -1 if the column is not in the list', () => {
      const index = getColumnIndex(columns, '4')

      expect(index).toBe(-1)
    })
  })

  describe('getColumn', () => {
    it('should return the column', () => {
      const column = getColumn(columns, '2')

      expect(column).toEqual(columns[1])
    })

    it('should return undefined if the column is not in the list', () => {
      const column = getColumn(columns, '4')

      expect(column).toBeUndefined()
    })
  })

  describe('getColumnsToUpdate', () => {
    it('should return the columns to update', () => {
      const columnsToUpdate = getColumnsToUpdate(columns, '2', '3')

      expect(columnsToUpdate).toEqual({
        fromColumnIndex: 1,
        fromColumn: columns[1],
        toColumnIndex: 2,
        toColumn: columns[2]
      })
    })

    it('should return undefined if the toColumnIndex is not in the list', () => {
      const columnsToUpdate = getColumnsToUpdate(columns, '2', '4')

      expect(columnsToUpdate).toEqual({
        fromColumnIndex: 1,
        fromColumn: columns[1],
        toColumnIndex: -1,
        toColumn: undefined
      })
    })

    it('should return undefined if the toColumnIndex is not provided', () => {
      const columnsToUpdate = getColumnsToUpdate(columns, '2')

      expect(columnsToUpdate).toEqual({
        fromColumnIndex: 1,
        fromColumn: columns[1],
        toColumnIndex: undefined,
        toColumn: undefined
      })
    })
  })
})
