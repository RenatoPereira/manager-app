export interface Board {
  id: string
  name: string
  description: string
}

export interface BoardRequest {
  userId?: string
  name: string
  description: string
}
