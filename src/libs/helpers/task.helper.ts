import { Task } from '@/@types/tasks.type'

export const taskInsert = (items: Task[], newIndex: number, item: Task) => {
  const newItems = [...items]

  newItems.splice(newIndex, 0, item)

  return newItems
}

export const taskRemove = (items: Task[], item: Task) => {
  return items.filter((i) => i.id !== item.id)
}
