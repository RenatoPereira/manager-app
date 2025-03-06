import { TaskCreateValidation, TaskUpdateValidation } from './task.validation'

jest.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) => key
}))

describe('TaskCreateValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate valid task data', async () => {
    const formData = new FormData()
    formData.append('name', 'Test task')
    formData.append('columnId', 'test-column-id')
    formData.append('boardId', 'test-board-id')

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Test task',
        columnId: 'test-column-id',
        boardId: 'test-board-id'
      })
    }
  })

  it('should validate task with null name', async () => {
    const formData = new FormData()
    formData.append('columnId', 'test-column-id')
    formData.append('boardId', 'test-board-id')

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.invalid_type')
    }
  })

  it('should fail validation when name is too short', async () => {
    const formData = new FormData()
    formData.append('name', 'Te')
    formData.append('columnId', 'test-column-id')
    formData.append('boardId', 'test-board-id')

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.too_small')
    }
  })

  it('should validate task with null columnId', async () => {
    const formData = new FormData()
    formData.append('name', 'Test task')
    formData.append('boardId', 'test-board-id')

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['columnId'])
      expect(result.error.errors[0].message).toBe('columnId.invalid_type')
    }
  })

  it('should validate task with null boardId', async () => {
    const formData = new FormData()
    formData.append('name', 'Test task')
    formData.append('columnId', 'test-column-id')

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['boardId'])
      expect(result.error.errors[0].message).toBe('boardId.invalid_type')
    }
  })
})

describe('TaskUpdateValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate valid task data', async () => {
    const formData = new FormData()
    formData.append('name', 'Test task')
    formData.append('taskId', 'test-task-id')
    const result = await TaskUpdateValidation(formData)

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data).toEqual({
        name: 'Test task',
        taskId: 'test-task-id'
      })
    }
  })

  it('should fail valid ation when name is too short', async () => {
    const formData = new FormData()
    formData.append('taskId', 'test-task-id')
    formData.append('name', 'Te')
    const result = await TaskUpdateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.too_small')
    }
  })

  it('should fail valid ation when description is too short', async () => {
    const formData = new FormData()
    formData.append('taskId', 'test-task-id')
    formData.append('name', 'Test task')
    formData.append('description', 'Te')

    const result = await TaskUpdateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['description'])
      expect(result.error.errors[0].message).toBe('description.too_small')
    }
  })

  it('should validate task with null taskId', async () => {
    const formData = new FormData()
    formData.append('name', 'Test task')
    formData.append('boardId', 'test-board-id')

    const result = await TaskUpdateValidation(formData)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['taskId'])
      expect(result.error.errors[0].message).toBe('taskId.invalid_type')
    }
  })
})
