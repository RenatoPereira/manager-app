import { isValidIndex } from './validation.helper'

describe('isValidIndex', () => {
  it('should return true if the index is valid', () => {
    const index = isValidIndex(1)

    expect(index).toBe(true)
  })

  it('should return false if the index is not valid', () => {
    const index = isValidIndex(undefined)

    expect(index).toBe(false)
  })

  it('should return false if the index is null', () => {
    const index = isValidIndex(null)

    expect(index).toBe(false)
  })

  it('should return false if index is -1', () => {
    const index = isValidIndex(-1)

    expect(index).toBe(false)
  })
})
