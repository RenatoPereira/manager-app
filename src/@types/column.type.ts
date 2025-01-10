import { Task } from './tasks.type'

export type Column = {
  id: string
  name: string
  order: number
  tasks: Task[]
  boardId: string
}

export type ColumnRequest = {
  name: string
  order: number
  boardId: string
  tasks: Task[]
}
