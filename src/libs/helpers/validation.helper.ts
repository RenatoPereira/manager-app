export const isValidIndex = (index: unknown) => {
  return typeof index !== 'undefined' && index !== null && index !== -1
}
