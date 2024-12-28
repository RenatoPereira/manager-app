import { ErrorCodes } from '../helpers/error-codes.helper'

class GenericException extends Error {
  constructor(code: ErrorCodes, message: string) {
    const errorMessage = `[${code}] ${message}`
    super(errorMessage)
  }
}

export { GenericException }
