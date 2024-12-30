import { Column } from './column.type'

export interface Board {
  id: string
  name: string
  description: string
  columns: Column[]
}

export interface BoardRequest {
  userId?: string
  name: string
  description: string
}
