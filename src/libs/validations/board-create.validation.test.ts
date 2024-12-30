import { BoardCreateValidation } from './board-create.validation'

jest.mock('next-intl/server', () => ({
  getTranslations: jest
    .fn()
    .mockImplementation(async () => (key: string) => key)
}))

describe('BoardCreateValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate valid board data', async () => {
    const formData = new FormData()
    formData.append('name', 'Test Board')
    formData.append('description', 'Test Description')

    const result = await BoardCreateValidation(formData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Test Board',
        description: 'Test Description'
      })
    }
  })

  it('should validate board with null description', async () => {
    const formData = new FormData()
    formData.append('name', 'Test Board')
    formData.append('description', '')

    const result = await BoardCreateValidation(formData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Test Board',
        description: ''
      })
    }
  })

  it('should fail validation when name is too short', async () => {
    const formData = new FormData()
    formData.append('name', 'Te')
    formData.append('description', 'Test Description')

    const result = await BoardCreateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.too_small')
    }
  })

  it('should fail validation when name is missing', async () => {
    const formData = new FormData()
    formData.append('description', 'Test Description')

    const result = await BoardCreateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
    }
  })
})
