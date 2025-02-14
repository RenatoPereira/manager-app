export type Task = {
  id: string
  boardId: string
  name: string
  description?: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
}

export type TaskRequest = {
  columnId: string
  name: string
}
