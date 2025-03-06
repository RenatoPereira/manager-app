import { sanitizeObject } from './object.helper'

describe('Object Helper', () => {
  describe('sanitizeObject', () => {
    it('should remove undefined values from an object', () => {
      const input = {
        name: 'John',
        age: 30,
        address: undefined,
        email: 'john@example.com'
      }

      const expected = {
        name: 'John',
        age: 30,
        email: 'john@example.com'
      }

      expect(sanitizeObject(input)).toEqual(expected)
    })

    it('should return an empty object when all values are undefined', () => {
      const input = {
        name: undefined,
        age: undefined,
        address: undefined
      }

      expect(sanitizeObject(input)).toEqual({})
    })

    it('should return the same object when no undefined values exist', () => {
      const input = {
        name: 'John',
        age: 30,
        email: 'john@example.com'
      }

      expect(sanitizeObject(input)).toEqual(input)
    })

    it('should handle null values correctly (not remove them)', () => {
      const input = {
        name: 'John',
        age: null,
        address: undefined
      }

      const expected = {
        name: 'John'
      }

      expect(sanitizeObject(input)).toEqual(expected)
    })

    it('should handle empty objects', () => {
      const input = {}
      expect(sanitizeObject(input)).toEqual({})
    })

    it('should handle objects with various data types', () => {
      const input = {
        string: 'text',
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        object: { key: 'value' },
        nullValue: null,
        undefinedValue: undefined
      }

      const expected = {
        string: 'text',
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        object: { key: 'value' }
      }

      expect(sanitizeObject(input)).toEqual(expected)
    })
  })
})
