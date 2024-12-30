import wretch from 'wretch'

import { RequesterApi } from './requester.api'

jest.mock('wretch')

describe('RequesterApi', () => {
  let api: RequesterApi
  const mockUrl = 'https://api.example.com'
  const mockWretch = {
    headers: jest.fn().mockReturnThis(),
    auth: jest.fn().mockReturnThis(),
    get: jest.fn().mockReturnThis(),
    post: jest.fn().mockReturnThis(),
    put: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    url: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(wretch as unknown as jest.Mock).mockReturnValue(mockWretch)
    api = new RequesterApi(mockUrl)
  })

  describe('constructor', () => {
    it('should initialize with correct default headers', () => {
      expect(wretch).toHaveBeenCalledWith(mockUrl, {})
      expect(mockWretch.headers).toHaveBeenCalledWith({
        'Content-Type': 'application/json',
        'User-Agent': 'ManagerApp/Web'
      })
    })

    it('should accept custom options', () => {
      const customOptions = { credentials: 'include' as RequestCredentials }
      new RequesterApi(mockUrl, customOptions)
      expect(wretch).toHaveBeenCalledWith(mockUrl, customOptions)
    })
  })

  describe('authenticate', () => {
    it('should not set authentication header with bearer token', () => {
      const token = undefined
      api.authenticate(token)
      api.get(mockUrl)
      expect(mockWretch.auth).not.toHaveBeenCalled()
    })

    it('should set authentication header with bearer token', () => {
      const token = 'test-token'
      api.authenticate(token)
      api.get(mockUrl)
      expect(mockWretch.auth).toHaveBeenCalledWith(`Bearer ${token}`)
    })
  })

  describe('HTTP methods', () => {
    const testUrl = '/test'
    const testBody = { data: 'test' }
    const mockResponse = { success: true }

    beforeEach(() => {
      mockWretch.json.mockResolvedValue(mockResponse)
    })

    describe('get', () => {
      it('should make GET request and return JSON response', async () => {
        const response = await api.get(testUrl)
        expect(mockWretch.get).toHaveBeenCalled()
        expect(mockWretch.url).toHaveBeenCalledWith(testUrl)
        expect(mockWretch.json).toHaveBeenCalled()
        expect(response).toEqual(mockResponse)
      })
    })

    describe('post', () => {
      it('should make POST request with body and return JSON response', async () => {
        const response = await api.post(testUrl, testBody)
        expect(mockWretch.post).toHaveBeenCalledWith(testBody)
        expect(mockWretch.url).toHaveBeenCalledWith(testUrl)
        expect(mockWretch.json).toHaveBeenCalled()
        expect(response).toEqual(mockResponse)
      })
    })

    describe('put', () => {
      it('should make PUT request with body and return JSON response', async () => {
        const response = await api.put(testUrl, testBody)
        expect(mockWretch.put).toHaveBeenCalledWith(testBody)
        expect(mockWretch.url).toHaveBeenCalledWith(testUrl)
        expect(mockWretch.json).toHaveBeenCalled()
        expect(response).toEqual(mockResponse)
      })
    })

    describe('delete', () => {
      it('should make DELETE request and return JSON response', async () => {
        const response = await api.delete(testUrl)
        expect(mockWretch.delete).toHaveBeenCalled()
        expect(mockWretch.url).toHaveBeenCalledWith(testUrl)
        expect(mockWretch.json).toHaveBeenCalled()
        expect(response).toEqual(mockResponse)
      })
    })
  })

  describe('getRequester', () => {
    it('should return the wretch instance', () => {
      const requester = api.getRequester()
      expect(requester).toBe(mockWretch)
    })
  })
})
