import { redirect } from 'next/navigation'

import { boardService } from '@/libs/services/board.service'
import { BoardCreateValidation } from '@/libs/validations/board.validation'

import { createBoard, deleteBoard, updateBoard } from './board.action'

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

jest.mock('@/libs/validations/board.validation', () => ({
  BoardCreateValidation: jest.fn()
}))

jest.mock('@/libs/services/board.service', () => ({
  boardService: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}))

describe('board.action', () => {
  describe('createBoard', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('name', 'Test Board')
      mockFormData.append('description', 'Test Description')

      jest.clearAllMocks()
    })

    it('should create a board and redirect on successful validation', async () => {
      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Board',
          description: 'Test Description'
        }
      })
      ;(boardService.create as jest.Mock).mockResolvedValue({
        id: 'test-board-id',
        name: 'Test Board',
        description: 'Test Description'
      })

      await createBoard({}, mockFormData)

      expect(BoardCreateValidation).toHaveBeenCalledWith(mockFormData)

      expect(boardService.create).toHaveBeenCalledWith({
        userId: '1',
        name: 'Test Board',
        description: 'Test Description'
      })

      expect(redirect).toHaveBeenCalledWith('/boards/test-board-id')
    })

    it('should handle empty description', async () => {
      const formDataWithoutDescription = new FormData()
      formDataWithoutDescription.append('name', 'Test Board')
      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Board',
          description: ''
        }
      })
      ;(boardService.create as jest.Mock).mockResolvedValue({
        id: 'test-board-id',
        name: 'Test Board',
        description: ''
      })

      await createBoard({}, formDataWithoutDescription)

      expect(boardService.create).toHaveBeenCalledWith({
        userId: '1',
        name: 'Test Board',
        description: null
      })
    })

    it('should return validation errors when validation fails', async () => {
      const mockValidationError = {
        format: () => ({
          name: { message: 'Name is required' },
          description: { message: 'Description is too long' }
        })
      }

      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: false,
        error: mockValidationError
      })

      const result = await createBoard({}, mockFormData)

      expect(BoardCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(result).toEqual({
        data: mockFormData,
        errors: mockValidationError.format()
      })

      expect(boardService.create).not.toHaveBeenCalled()
      expect(redirect).not.toHaveBeenCalled()
    })

    it('should handle board creation failure', async () => {
      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Board',
          description: 'Test Description'
        }
      })
      ;(boardService.create as jest.Mock).mockResolvedValue(null)

      await createBoard({}, mockFormData)

      expect(BoardCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(boardService.create).toHaveBeenCalledWith({
        userId: '1',
        name: 'Test Board',
        description: 'Test Description'
      })
      expect(redirect).not.toHaveBeenCalled()
    })
  })

  describe('updateBoard', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('boardId', 'test-board-id')
      mockFormData.append('name', 'Updated Board Name')

      jest.clearAllMocks()
    })

    it('should update board successfully', async () => {
      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Updated Board Name'
        }
      })
      ;(boardService.update as jest.Mock).mockResolvedValue({
        id: 'test-board-id',
        name: 'Updated Board Name'
      })

      const result = await updateBoard({}, mockFormData)

      expect(BoardCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(boardService.update).toHaveBeenCalledWith({
        id: 'test-board-id',
        name: 'Updated Board Name'
      })
      expect(result).toEqual({
        data: mockFormData,
        errors: null
      })
    })

    it('should return validation errors when validation fails', async () => {
      const mockValidationError = {
        format: () => ({
          name: { message: 'Name is required' }
        })
      }

      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: false,
        error: mockValidationError
      })

      const result = await updateBoard({}, mockFormData)

      expect(BoardCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(result).toEqual({
        data: mockFormData,
        errors: mockValidationError.format()
      })
      expect(boardService.update).not.toHaveBeenCalled()
    })

    it('should handle update failure', async () => {
      ;(BoardCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Updated Board Name'
        }
      })
      ;(boardService.update as jest.Mock).mockResolvedValue(null)

      const result = await updateBoard({}, mockFormData)

      expect(BoardCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(boardService.update).toHaveBeenCalledWith({
        id: 'test-board-id',
        name: 'Updated Board Name'
      })
      expect(result).toBeUndefined()
    })
  })

  describe('deleteBoard', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should delete board and redirect to home', async () => {
      ;(boardService.delete as jest.Mock).mockResolvedValue(true)

      await deleteBoard('test-board-id')

      expect(boardService.delete).toHaveBeenCalledWith('test-board-id')
      expect(redirect).toHaveBeenCalledWith('/')
    })

    it('should handle delete failure', async () => {
      ;(boardService.delete as jest.Mock).mockResolvedValue(null)

      await deleteBoard('test-board-id')

      expect(boardService.delete).toHaveBeenCalledWith('test-board-id')
      expect(redirect).not.toHaveBeenCalled()
    })
  })
})
