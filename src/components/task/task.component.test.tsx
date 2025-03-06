import { render, screen } from '@testing-library/react'

import { Task } from '@/@types/tasks.type'

import { TaskComponent } from './task.component'

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn()
  }),
  useParams: () => ({
    id: 'test-board-id'
  })
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('TaskComponent', () => {
  const mockTask: Task = {
    id: 'test-task-id',
    name: 'Test task',
    description: 'Test description',
    status: 'done',
    boardId: 'test-board-id',
    priority: 'low',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    columnId: 'test-column-id'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the task component', () => {
    render(<TaskComponent task={mockTask} />)

    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()

    const buttonFinish = screen.getByText('buttons.finish')
    expect(buttonFinish).toBeInTheDocument()
    expect(buttonFinish).toBeDisabled()

    const buttonDelete = screen.getByText('buttons.delete')
    expect(buttonDelete).toBeInTheDocument()
  })

  it('should render the task component with the correct priority', () => {
    render(<TaskComponent task={mockTask} />)

    expect(screen.getByText('priority.low')).toHaveClass(
      'bg-sky-700 dark:bg-cyan-900 text-white hover:bg-sky-800 dark:hover:bg-cyan-800'
    )
    expect(screen.getByText('priority.medium')).toHaveClass(
      'border border-cyan-700 dark:border-cyan-900 text-cyan-600 dark:text-cyan-600 hover:bg-cyan-800 dark:hover:bg-cyan-800 hover:text-white'
    )
    expect(screen.getByText('priority.high')).toHaveClass(
      'border border-cyan-700 dark:border-cyan-900 text-cyan-600 dark:text-cyan-600 hover:bg-cyan-800 dark:hover:bg-cyan-800 hover:text-white'
    )
  })

  it('should render the task component with the correct status', () => {
    render(<TaskComponent task={{ ...mockTask, status: 'todo' }} />)

    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()

    const buttonFinish = screen.getByText('buttons.finish')
    expect(buttonFinish).toBeInTheDocument()
    expect(buttonFinish).not.toBeDisabled()
  })
})
