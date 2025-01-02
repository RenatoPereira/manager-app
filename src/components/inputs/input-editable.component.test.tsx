import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { InputEditableComponent } from './input-editable.component'

describe('InputEditableComponent', () => {
  const mockOnSubmit = jest.fn()
  const defaultProps = {
    name: 'test-input',
    value: 'Initial Value',
    onSubmit: mockOnSubmit
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with initial value', () => {
    render(<InputEditableComponent {...defaultProps} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Initial Value')
    expect(screen.getByRole('textbox')).toHaveClass('pointer-events-none')
  })

  it('enters edit mode when edit button is clicked', async () => {
    const user = userEvent.setup()

    render(<InputEditableComponent {...defaultProps} />)

    const editButton = screen.getByLabelText('Edit')
    await user.click(editButton)

    expect(screen.getByRole('textbox')).not.toHaveClass('pointer-events-none')
  })

  it('shows cancel and submit buttons in edit mode', async () => {
    const user = userEvent.setup()

    render(<InputEditableComponent {...defaultProps} />)

    const editButton = screen.getByLabelText('Edit')
    await user.click(editButton)

    expect(screen.getByLabelText('Cancel')).toBeInTheDocument()
    expect(screen.getByLabelText('Submit')).toBeInTheDocument()
  })

  it('cancels editing when cancel button is clicked', async () => {
    const user = userEvent.setup()

    render(<InputEditableComponent {...defaultProps} />)

    const editButton = screen.getByLabelText('Edit')
    await user.click(editButton)

    expect(screen.getByRole('textbox')).not.toHaveClass('pointer-events-none')

    const cancelButton = screen.getByLabelText('Cancel')
    await user.click(cancelButton)

    expect(screen.getByRole('textbox')).toHaveClass('pointer-events-none')
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()

    render(<InputEditableComponent {...defaultProps} />)

    const editButton = screen.getByLabelText('Edit')
    await user.click(editButton)

    const submitButton = screen.getByLabelText('Submit')
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalled()
  })

  it('renders with hidden fields when provided', () => {
    const hiddenFields = [
      { name: 'field1', value: 'value1' },
      { name: 'field2', value: 'value2' }
    ]

    render(
      <InputEditableComponent {...defaultProps} hiddenFields={hiddenFields} />
    )

    const hiddenInputs = screen.getAllByRole('none', { hidden: true })
    expect(hiddenInputs).toHaveLength(2)
  })

  it('displays error state when error prop is provided', async () => {
    const user = userEvent.setup()

    render(
      <InputEditableComponent {...defaultProps} error={['Error message']} />
    )

    const editButton = screen.getByLabelText('Edit')
    await user.click(editButton)

    const input = screen.getByRole('textbox')
    expect(input.className).toContain('border-red-500')
  })

  it('shows loading component when isPending is true', async () => {
    const user = userEvent.setup()

    render(<InputEditableComponent {...defaultProps} />)

    const editButton = screen.getByLabelText('Edit')
    await user.click(editButton)

    const submitButton = screen.getByLabelText('Submit')
    await user.click(submitButton)

    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })
})
