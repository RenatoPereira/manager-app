export const sanitizeObject = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null
    )
  )
}
