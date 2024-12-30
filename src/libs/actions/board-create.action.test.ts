import { redirect } from 'next/navigation'

import { boardService } from '@/libs/services/board.service'
import { BoardCreateValidation } from '@/libs/validations/board-create.validation'

import { createBoard } from './board-create.action'

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

jest.mock('@/libs/validations/board-create.validation', () => ({
  BoardCreateValidation: jest.fn()
}))

jest.mock('@/libs/services/board.service', () => ({
  boardService: {
    create: jest.fn()
  }
}))

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
