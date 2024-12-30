import { render, screen } from '@testing-library/react'

import { Task } from '@/@types/tasks.type'

import { ColumnComponent } from './column.component'

describe('ColumnComponent', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      name: 'Test Task 1',
      description: 'Test Description 1',
      status: 'TODO',
      priority: 'Low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      boardId: '1'
    },
    {
      id: '2',
      name: 'Test Task 2',
      description: 'Test Description 2',
      status: 'TODO',
      priority: 'High',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      boardId: '1'
    }
  ]

  const defaultProps = {
    id: 'column-1',
    name: 'Test Column',
    tasks: mockTasks
  }

  it('should render column name correctly', () => {
    render(<ColumnComponent {...defaultProps} />)
    expect(screen.getByText('Test Column')).toBeInTheDocument()
  })

  it('should render all tasks', () => {
    render(<ColumnComponent {...defaultProps} />)
    expect(screen.getByText('Test Task 1')).toBeInTheDocument()
    expect(screen.getByText('Test Task 2')).toBeInTheDocument()
  })

  it('should render empty column when no tasks are provided', () => {
    render(<ColumnComponent {...defaultProps} tasks={[]} />)
    const taskElements = screen.queryAllByRole('article') // Assuming CardTaskComponent has role="article"
    expect(taskElements).toHaveLength(0)
  })

  it('should have correct styling classes', () => {
    render(<ColumnComponent {...defaultProps} />)
    const columnSection = screen.getByRole('region')
    expect(columnSection).toHaveClass(
      'dark:bg-violet-950/50',
      'rounded-lg',
      'p-4'
    )
  })
})
