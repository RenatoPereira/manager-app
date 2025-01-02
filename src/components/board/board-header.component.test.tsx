import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { deleteBoard } from '@/libs/actions/board.action'

import { BoardHeaderComponent } from './board-header.component'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

jest.mock('@/libs/actions/board.action')

describe('BoardHeaderComponent', () => {
  const mockBoard = {
    id: '1',
    name: 'Test Board',
    description: 'Test Description',
    columns: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user1'
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders board name correctly', () => {
    render(<BoardHeaderComponent board={mockBoard} />)
    expect(screen.getByDisplayValue('Test Board')).toBeInTheDocument()
  })

  it('shows settings dropdown when clicking settings icon', async () => {
    const user = userEvent.setup()

    render(<BoardHeaderComponent board={mockBoard} />)
    const settingsButton = screen.getByLabelText('settings.toggle')
    await user.click(settingsButton)

    expect(screen.getByText('settings.delete')).toBeInTheDocument()
  })

  it('calls deleteBoard when delete option is clicked', async () => {
    const user = userEvent.setup()

    render(<BoardHeaderComponent board={mockBoard} />)

    const settingsButton = screen.getByLabelText('settings.toggle')
    await user.click(settingsButton)

    const deleteButton = screen.getByText('settings.delete')
    await user.click(deleteButton)

    const confirmButton = screen.getByLabelText('modal.confirm')
    await user.click(confirmButton)

    expect(deleteBoard).toHaveBeenCalledWith(mockBoard.id)
  })
})
