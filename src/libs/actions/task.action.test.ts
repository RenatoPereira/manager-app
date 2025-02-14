import { taskService } from '@/libs/services/task.service'
import { TaskCreateValidation } from '@/libs/validations/task.validation'

import { createTask } from './task.action'

jest.mock('@/libs/validations/task.validation', () => ({
  TaskCreateValidation: jest.fn()
}))

jest.mock('@/libs/services/task.service', () => ({
  taskService: {
    create: jest.fn()
  }
}))

describe('  .action', () => {
  describe('createTask', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('name', 'Test task')
      mockFormData.append('columnId', 'test-column-id')
      jest.clearAllMocks()
    })

    it('should update a task and redirect on successful validation', async () => {
      ;(TaskCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test task'
        }
      })
      ;(taskService.create as jest.Mock).mockResolvedValue({
        name: 'Test task',
        columnId: 'test-column-id'
      })

      await createTask({}, mockFormData)

      expect(TaskCreateValidation).toHaveBeenCalledWith(mockFormData)

      expect(taskService.create).toHaveBeenCalledWith({
        columnId: 'test-column-id',
        name: 'Test task'
      })
    })

    it('should return validation errors when validation fails', async () => {
      const mockValidationError = {
        format: () => ({
          name: { message: 'Name is required' }
        })
      }

      ;(TaskCreateValidation as jest.Mock).mockResolvedValue({
        success: false,
        error: mockValidationError
      })

      const result = await createTask({}, mockFormData)

      expect(TaskCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(result).toEqual({
        data: mockFormData,
        errors: mockValidationError.format()
      })

      expect(taskService.create).not.toHaveBeenCalled()
    })

    it('should handle task create failure', async () => {
      ;(TaskCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test task'
        }
      })
      ;(taskService.create as jest.Mock).mockResolvedValue(null)

      await createTask({}, mockFormData)

      expect(TaskCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(taskService.create).toHaveBeenCalledWith({
        columnId: 'test-column-id',
        name: 'Test task'
      })
    })
  })
})
