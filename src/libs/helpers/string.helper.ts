export const compareStringsInsensitive = (a: string, b: string) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false

  return a.toLowerCase() === b.toLowerCase()
}

export const sanitizeString = (text: string) => {
  return text.trim().replace(/<[^>]*>?/g, '')
}

export const limitString = (text: string, limit: number) => {
  return text.length > limit ? text.substring(0, limit) : text
}
