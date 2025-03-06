export type Task = {
  id: string
  boardId: string
  columnId: string
  name: string
  description?: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
  dueDate?: string
}

export type TaskRequest = {
  boardId: string
  columnId: string
  name: string
  description?: string
  status: string
  priority: string
  dueDate?: string
}
