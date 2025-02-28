import { compareStringsInsensitive } from './string.helper'

describe('string helpers', () => {
  describe('compareStringsInsensitive', () => {
    it('should return true for strings that match ignoring case', () => {
      expect(compareStringsInsensitive('hello', 'HELLO')).toBe(true)
      expect(compareStringsInsensitive('World', 'world')).toBe(true)
      expect(compareStringsInsensitive('MiXeD', 'mixed')).toBe(true)
    })

    it('should return false for different strings', () => {
      expect(compareStringsInsensitive('hello', 'world')).toBe(false)
      expect(compareStringsInsensitive('test', 'testing')).toBe(false)
      expect(compareStringsInsensitive('', 'notempty')).toBe(false)
    })

    it('should handle empty strings', () => {
      expect(compareStringsInsensitive('', '')).toBe(true)
    })

    it('should handle strings with special characters', () => {
      expect(compareStringsInsensitive('Hello!', 'HELLO!')).toBe(true)
      expect(compareStringsInsensitive('@test', '@TEST')).toBe(true)
    })
  })
})
