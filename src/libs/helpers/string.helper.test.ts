import {
  compareStringsInsensitive,
  limitString,
  sanitizeString
} from './string.helper'

describe('String Helper', () => {
  describe('compareStringsInsensitive', () => {
    it('should return true for strings that match case-insensitively', () => {
      expect(compareStringsInsensitive('hello', 'HELLO')).toBe(true)
      expect(compareStringsInsensitive('Hello World', 'hello world')).toBe(true)
      expect(compareStringsInsensitive('', '')).toBe(true)
    })

    it('should return false for strings that do not match', () => {
      expect(compareStringsInsensitive('hello', 'world')).toBe(false)
      expect(compareStringsInsensitive('hello', 'hello ')).toBe(false)
      expect(compareStringsInsensitive('hello123', 'hello')).toBe(false)
    })
  })

  describe('sanitizeString', () => {
    it('should trim whitespace from the string', () => {
      expect(sanitizeString('  hello  ')).toBe('hello')
      expect(sanitizeString('\nhello\t')).toBe('hello')
    })

    it('should remove HTML tags from the string', () => {
      expect(sanitizeString('<p>hello</p>')).toBe('hello')
      expect(sanitizeString('<div><span>nested</span> tags</div>')).toBe(
        'nested tags'
      )
      expect(sanitizeString('text with <br> line break')).toBe(
        'text with  line break'
      )
    })

    it('should handle strings with both whitespace and HTML tags', () => {
      expect(sanitizeString('  <p>hello</p>  ')).toBe('hello')
    })

    it('should return empty string when input is empty or only contains tags', () => {
      expect(sanitizeString('')).toBe('')
      expect(sanitizeString('  ')).toBe('')
      expect(sanitizeString('<div></div>')).toBe('')
    })
  })

  describe('limitString', () => {
    it('should truncate strings longer than the limit', () => {
      expect(limitString('hello world', 5)).toBe('hello')
      expect(limitString('testing', 4)).toBe('test')
    })

    it('should return the original string if it is shorter than or equal to the limit', () => {
      expect(limitString('hello', 5)).toBe('hello')
      expect(limitString('hi', 10)).toBe('hi')
      expect(limitString('', 5)).toBe('')
    })

    it('should handle limit of zero', () => {
      expect(limitString('hello', 0)).toBe('')
    })
  })
})
