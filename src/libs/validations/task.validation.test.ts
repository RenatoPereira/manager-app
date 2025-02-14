import { TaskCreateValidation } from './task.validation'

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

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Test task',
        columnId: 'test-column-id'
      })
    }
  })

  it('should validate task with null name', async () => {
    const formData = new FormData()
    formData.append('columnId', 'test-column-id')

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

    const result = await TaskCreateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.too_small')
    }
  })

  it('should validate task with null columnId', async () => {
    const formData = new FormData()

    const result = await TaskCreateValidation(formData)
    formData.append('name', 'Test task')

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['columnId'])
      expect(result.error.errors[0].message).toBe('columnId.invalid_type')
    }
  })
})
