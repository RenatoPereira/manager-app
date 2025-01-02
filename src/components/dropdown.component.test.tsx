import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DropdownComponent } from './dropdown.component'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('DropdownComponent', () => {
  const mockAction = jest.fn()
  const mockCriticalAction = jest.fn()

  const defaultProps = {
    children: 'Toggle',
    options: [
      { label: 'Edit', action: mockAction },
      { label: 'Delete', action: mockCriticalAction, criticalAction: true }
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children correctly', () => {
    render(<DropdownComponent {...defaultProps} />)
    expect(screen.getByText('Toggle')).toBeInTheDocument()
  })

  it('shows options when clicked', async () => {
    const user = userEvent.setup()

    render(<DropdownComponent {...defaultProps} />)

    expect(screen.getByRole('menu')).toHaveClass('opacity-0')

    const button = screen.getByText('Toggle')
    await user.click(button)

    expect(screen.getByRole('menu')).toHaveClass('opacity-100')
  })

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup()

    render(<DropdownComponent {...defaultProps} />)

    const button = screen.getByText('Toggle')
    await user.click(button)

    const overlay = screen.getByTestId('dropdown-overlay')
    await user.click(overlay)

    expect(screen.getByRole('menu')).toHaveClass('opacity-0')
  })

  it('shows confirmation modal for actions', async () => {
    const user = userEvent.setup()

    render(<DropdownComponent {...defaultProps} />)

    const button = screen.getByText('Toggle')
    await user.click(button)
    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(
      screen.getByText('Are you sure you want to Delete?')
    ).toBeInTheDocument()
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument()
  })

  it('executes action when confirmed', async () => {
    const user = userEvent.setup()

    render(<DropdownComponent {...defaultProps} />)

    const button = screen.getByText('Toggle')
    await user.click(button)
    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)
    const confirmButton = screen.getByText('modal.confirm')
    await user.click(confirmButton)

    expect(mockCriticalAction).toHaveBeenCalledTimes(1)
  })

  it('does not execute action when cancelled', async () => {
    const user = userEvent.setup()

    render(<DropdownComponent {...defaultProps} />)

    const button = screen.getByText('Toggle')
    await user.click(button)
    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)
    const cancelButton = screen.getByText('modal.cancel')
    await user.click(cancelButton)

    expect(mockCriticalAction).not.toHaveBeenCalled()
  })

  it('applies correct styling for critical actions', async () => {
    const user = userEvent.setup()

    render(<DropdownComponent {...defaultProps} />)

    const button = screen.getByText('Toggle')
    await user.click(button)

    const deleteButton = screen.getByText('Delete')
    const editButton = screen.getByText('Edit')

    expect(deleteButton).toHaveClass('text-red-500')
    expect(editButton).toHaveClass('text-cyan-800')
  })
})
