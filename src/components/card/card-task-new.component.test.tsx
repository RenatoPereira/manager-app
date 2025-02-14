import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CardTaskNewComponent } from './card-task-new.component'

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

describe('CardTaskNewComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the new task button with correct text', () => {
    render(<CardTaskNewComponent columnId="test-column-id" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('create')).toBeInTheDocument()

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('renders the new task button with correct text', async () => {
    const user = userEvent.setup()

    render(<CardTaskNewComponent columnId="test-column-id" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.queryByText('create')).toBeInTheDocument()

    const button = screen.getByRole('button')
    await user.click(button)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')

    const hiddenInput = screen.getByRole('none', {
      hidden: true
    }) as HTMLInputElement
    expect(hiddenInput).toHaveValue('test-column-id')

    expect(screen.queryByText('button')).not.toBeInTheDocument()
  })
})
