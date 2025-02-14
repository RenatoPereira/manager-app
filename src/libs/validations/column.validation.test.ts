import { ColumnUpdateValidation } from './column.validation'

jest.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) => key
}))

describe('ColumnUpdateValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should validate valid column data', async () => {
    const formData = new FormData()
    formData.append('name', 'Test Column')

    const result = await ColumnUpdateValidation(formData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        name: 'Test Column'
      })
    }
  })

  it('should validate column with null name', async () => {
    const formData = new FormData()

    const result = await ColumnUpdateValidation(formData)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.invalid_type')
    }
  })

  it('should fail validation when name is too short', async () => {
    const formData = new FormData()
    formData.append('name', 'Te')

    const result = await ColumnUpdateValidation(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].path).toEqual(['name'])
      expect(result.error.errors[0].message).toBe('name.too_small')
    }
  })
})
