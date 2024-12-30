import { Task } from './tasks.type'

export type Column = {
  id: string
  name: string
  order: number
  tasks: Task[]
}
