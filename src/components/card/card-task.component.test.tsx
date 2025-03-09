import { render, screen } from '@testing-library/react'

import { CardTaskComponent } from './card-task.component'

describe('CardTaskComponent', () => {
  const mockTask = {
    id: '1',
    boardId: '1',
    name: 'Test Task',
    description: 'Test Description',
    status: 'TODO',
    priority: 'Low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    columnId: '1'
  }

  it('renders task name and description', () => {
    render(<CardTaskComponent task={mockTask} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders task without description', () => {
    const taskWithoutDescription = {
      ...mockTask,
      description: undefined
    }

    render(<CardTaskComponent task={taskWithoutDescription} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('renders a link with correct href', () => {
    render(<CardTaskComponent task={mockTask} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/boards/1?taskId=1')
  })

  it('truncates long descriptions', () => {
    const longDescription =
      'This is a very long description that should be truncated. '.repeat(10)
    const taskWithLongDescription = {
      ...mockTask,
      description: longDescription
    }

    render(<CardTaskComponent task={taskWithLongDescription} />)

    const description = screen.getByText(/This is a very long description/)
    expect(description).toHaveClass('line-clamp-2')
  })
})
