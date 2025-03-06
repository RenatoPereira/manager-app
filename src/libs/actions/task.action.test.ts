import { taskService } from '@/libs/services/task.service'
import {
  TaskCreateValidation,
  TaskUpdateValidation
} from '@/libs/validations/task.validation'

import { createTask, updateTask } from './task.action'

jest.mock('@/libs/validations/task.validation', () => ({
  TaskCreateValidation: jest.fn(),
  TaskUpdateValidation: jest.fn()
}))

jest.mock('@/libs/services/task.service', () => ({
  taskService: {
    create: jest.fn(),
    update: jest.fn()
  }
}))

describe('Task Action', () => {
  describe('createTask', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('name', 'Test task')
      mockFormData.append('columnId', 'test-column-id')
      mockFormData.append('boardId', 'test-board-id')
      jest.clearAllMocks()
    })

    it('should update a task and redirect on successful validation', async () => {
      ;(TaskCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test task',
          boardId: 'test-board-id'
        }
      })
      ;(taskService.create as jest.Mock).mockResolvedValue({
        name: 'Test task',
        columnId: 'test-column-id',
        boardId: 'test-board-id'
      })

      await createTask({}, mockFormData)

      expect(TaskCreateValidation).toHaveBeenCalledWith(mockFormData)

      expect(taskService.create).toHaveBeenCalledWith({
        columnId: 'test-column-id',
        name: 'Test task',
        boardId: 'test-board-id'
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
          name: 'Test task',
          boardId: 'test-board-id'
        }
      })
      ;(taskService.create as jest.Mock).mockResolvedValue(null)

      await createTask({}, mockFormData)

      expect(TaskCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(taskService.create).toHaveBeenCalledWith({
        columnId: 'test-column-id',
        name: 'Test task',
        boardId: 'test-board-id'
      })
    })

    it('should handle task create failure when boardId is null', async () => {
      mockFormData.delete('boardId')
      ;(TaskCreateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test task',
          boardId: null
        }
      })
      ;(taskService.create as jest.Mock).mockResolvedValue(null)

      await createTask({}, mockFormData)

      expect(TaskCreateValidation).toHaveBeenCalledWith(mockFormData)
      expect(taskService.create).toHaveBeenCalledWith({
        columnId: 'test-column-id',
        name: 'Test task',
        boardId: null
      })
    })
  })

  describe('updateTask', () => {
    let mockFormData: FormData

    beforeEach(() => {
      mockFormData = new FormData()
      mockFormData.append('name', 'Test Task')
      mockFormData.append('taskId', 'test-task-id')
      jest.clearAllMocks()
    })

    it('should update a column and redirect on successful validation', async () => {
      ;(TaskUpdateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Task',
          taskId: 'test-task-id',
          description: null
        }
      })
      ;(taskService.update as jest.Mock).mockResolvedValue({
        id: 'test-task-id',
        name: 'Test Task'
      })

      await updateTask({}, mockFormData)

      expect(TaskUpdateValidation).toHaveBeenCalledWith(mockFormData)

      expect(taskService.update).toHaveBeenCalledWith({
        id: 'test-task-id',
        name: 'Test Task'
      })
    })

    it('should return validation errors when validation fails', async () => {
      const mockValidationError = {
        format: () => ({
          name: { message: 'Name is required' },
          taskId: { message: 'Task is required' }
        })
      }

      ;(TaskUpdateValidation as jest.Mock).mockResolvedValue({
        success: false,
        error: mockValidationError
      })

      const result = await updateTask({}, mockFormData)

      expect(TaskUpdateValidation).toHaveBeenCalledWith(mockFormData)
      expect(result).toEqual({
        data: mockFormData,
        errors: mockValidationError.format()
      })

      expect(taskService.update).not.toHaveBeenCalled()
    })

    it('should handle task update failure', async () => {
      ;(TaskUpdateValidation as jest.Mock).mockResolvedValue({
        success: true,
        data: {
          name: 'Test Task',
          taskId: 'test-task-id',
          description: null
        }
      })
      ;(taskService.update as jest.Mock).mockResolvedValue(null)

      await updateTask({}, mockFormData)

      expect(TaskUpdateValidation).toHaveBeenCalledWith(mockFormData)
      expect(taskService.update).toHaveBeenCalledWith({
        id: 'test-task-id',
        name: 'Test Task'
      })
    })
  })
})
