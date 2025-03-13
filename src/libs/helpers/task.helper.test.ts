import { Task } from '@/@types/tasks.type'

import { taskInsert, taskRemove } from './task.helper'

describe('taskHelper', () => {
  describe('taskInsert', () => {
    const tasks = [
      { id: 1, title: 'Task 1' } as unknown as Task,
      { id: 2, title: 'Task 2' } as unknown as Task,
      { id: 3, title: 'Task 3' } as unknown as Task
    ]

    it('should insert a task to second position', () => {
      const newTasks = taskInsert(tasks, 1, {
        id: 4,
        title: 'Task 4'
      } as unknown as Task)

      expect(newTasks).toEqual([
        { id: 1, title: 'Task 1' },
        { id: 4, title: 'Task 4' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' }
      ])
    })

    it('should insert a task to the end of the list', () => {
      const newTasks = taskInsert(tasks, 3, {
        id: 4,
        title: 'Task 4'
      } as unknown as Task)

      expect(newTasks).toEqual([
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' },
        { id: 4, title: 'Task 4' }
      ])
    })
  })

  describe('taskRemove', () => {
    const tasks = [
      { id: 1, title: 'Task 1' } as unknown as Task,
      { id: 2, title: 'Task 2' } as unknown as Task,
      { id: 3, title: 'Task 3' } as unknown as Task
    ]

    it('should remove a task from the list', () => {
      const newTasks = taskRemove(tasks, tasks[1])

      expect(newTasks).toEqual([
        { id: 1, title: 'Task 1' },
        { id: 3, title: 'Task 3' }
      ])
    })

    it('should do nothing if the task is not in the list', () => {
      const newTasks = taskRemove(tasks, {
        id: 4,
        title: 'Task 4'
      } as unknown as Task)

      expect(newTasks).toEqual(tasks)
    })
  })
})
