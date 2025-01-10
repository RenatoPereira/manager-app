import { redirect } from 'next/navigation'

import { columnService } from '@/libs/services/column.service'
import { ColumnUpdateValidation } from '@/libs/validations/column.validation'

import { updateColumn } from './column.action'
import { createColumn } from './column.action'

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

jest.mock('@/libs/validations/column.validation', () => ({
  ColumnUpdateValidation: jest.fn()
}))

jest.mock('@/libs/services/column.service', () => ({
  columnService: {
    update: jest.fn(),
    create: jest.fn()
  }
}))

describe('column.action', () => {
  describe('updateColumn', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('name', 'Test Column')
      mockFormData.append('columnId', 'test-column-id')
      jest.clearAllMocks()
    })

    it('should update a column and redirect on successful validation', async () => {
      ;(ColumnUpdateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Column'
        }
      })
      ;(columnService.update as jest.Mock).mockResolvedValue({
        id: 'test-column-id',
        name: 'Test Column'
      })

      await updateColumn({}, mockFormData)

      expect(ColumnUpdateValidation).toHaveBeenCalledWith(mockFormData)

      expect(columnService.update).toHaveBeenCalledWith({
        id: 'test-column-id',
        name: 'Test Column'
      })
    })

    it('should return validation errors when validation fails', async () => {
      const mockValidationError = {
        format: () => ({
          name: { message: 'Name is required' }
        })
      }

      ;(ColumnUpdateValidation as jest.Mock).mockResolvedValue({
        success: false,
        error: mockValidationError
      })

      const result = await updateColumn({}, mockFormData)

      expect(ColumnUpdateValidation).toHaveBeenCalledWith(mockFormData)
      expect(result).toEqual({
        data: mockFormData,
        errors: mockValidationError.format()
      })

      expect(columnService.update).not.toHaveBeenCalled()
      expect(redirect).not.toHaveBeenCalled()
    })

    it('should handle column update failure', async () => {
      ;(ColumnUpdateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Column'
        }
      })
      ;(columnService.update as jest.Mock).mockResolvedValue(null)

      await updateColumn({}, mockFormData)

      expect(ColumnUpdateValidation).toHaveBeenCalledWith(mockFormData)
      expect(columnService.update).toHaveBeenCalledWith({
        id: 'test-column-id',
        name: 'Test Column'
      })
      expect(redirect).not.toHaveBeenCalled()
    })
  })

  describe('createColumn', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('boardId', 'test-board-id')

      jest.clearAllMocks()
    })

    it('should create a column with default values', async () => {
      const expectedColumnRequest = {
        boardId: 'test-board-id',
        name: 'New Column',
        order: 0,
        tasks: []
      }

      const mockCreatedColumn = {
        id: 'test-column-id',
        ...expectedColumnRequest
      }

      ;(columnService.create as jest.Mock).mockResolvedValue(mockCreatedColumn)

      const result = await createColumn({}, mockFormData)

      expect(columnService.create).toHaveBeenCalledWith(expectedColumnRequest)
      expect(result).toEqual(mockCreatedColumn)
    })

    it('should handle column creation failure', async () => {
      ;(columnService.create as jest.Mock).mockResolvedValue(null)

      const result = await createColumn({}, mockFormData)

      expect(columnService.create).toHaveBeenCalledWith({
        boardId: 'test-board-id',
        name: 'New Column',
        order: 0,
        tasks: []
      })
      expect(result).toBeNull()
    })
  })
})
