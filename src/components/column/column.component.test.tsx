import { render, screen } from '@testing-library/react'

import { Task } from '@/@types/tasks.type'

import { ColumnComponent } from './column.component'

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn()
  })
}))

jest.mock('@/components/card/card-task-new.component', () => ({
  CardTaskNewComponent: () => <div>CardTaskNewComponent</div>
}))

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
      boardId: '1',
      columnId: '1'
    },
    {
      id: '2',
      name: 'Test Task 2',
      description: 'Test Description 2',
      status: 'TODO',
      priority: 'High',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      boardId: '1',
      columnId: '1'
    }
  ]

  const defaultProps = {
    id: 'column-1',
    name: 'Test Column',
    tasks: mockTasks
  }

  it('should render column name correctly', () => {
    render(<ColumnComponent {...defaultProps} />)
    expect(screen.getByDisplayValue('Test Column')).toBeInTheDocument()
  })

  it('should render all tasks', () => {
    render(<ColumnComponent {...defaultProps} />)
    expect(screen.getByText('Test Task 1')).toBeInTheDocument()
    expect(screen.getByText('Test Task 2')).toBeInTheDocument()
  })

  it('should render empty column when no tasks are provided', () => {
    render(<ColumnComponent {...defaultProps} tasks={[]} />)
    const taskElements = screen.queryAllByRole('article')
    expect(taskElements).toHaveLength(0)
  })

  it('should have correct styling classes', () => {
    render(<ColumnComponent {...defaultProps} />)
    const columnSection = screen.getByRole('region')
    expect(columnSection).toHaveClass(
      'bg-emerald-50/10',
      'dark:bg-violet-950/50',
      'rounded-md',
      'p-4',
      'pt-2',
      'border-t-4',
      'border-violet-800/30',
      'group/column'
    )
  })
})
