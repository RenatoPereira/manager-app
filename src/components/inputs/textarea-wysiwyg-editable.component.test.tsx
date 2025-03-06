import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextareaWysiwygEditableComponent } from './textarea-wysiwyg-editable.component'

describe('TextareaWysiwygEditableComponent', () => {
  it('should render', () => {
    render(
      <TextareaWysiwygEditableComponent
        name="test"
        value="test"
        onSubmit={() => {}}
      />
    )

    expect(screen.getByTestId('wysiwyg-content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Submit' })
    ).not.toBeInTheDocument()
  })

  it('should render opened', () => {
    render(
      <TextareaWysiwygEditableComponent
        name="test"
        value="test"
        onSubmit={() => {}}
        opened={true}
      />
    )

    expect(screen.queryByTestId('wysiwyg-content')).not.toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should change textbox when opened', async () => {
    const user = userEvent.setup()

    render(
      <TextareaWysiwygEditableComponent
        name="test"
        value="test"
        onSubmit={() => {}}
      />
    )

    expect(screen.getByTestId('wysiwyg-content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Submit' })
    ).not.toBeInTheDocument()

    const editButton = screen.getByRole('button', { name: 'Edit' })
    await user.click(editButton)

    expect(screen.queryByTestId('wysiwyg-content')).not.toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should cancel edit', async () => {
    const user = userEvent.setup()

    render(
      <TextareaWysiwygEditableComponent
        name="test"
        value="test"
        onSubmit={() => {}}
        opened={true}
      />
    )

    expect(screen.queryByTestId('wysiwyg-content')).not.toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    expect(screen.getByTestId('wysiwyg-content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Submit' })
    ).not.toBeInTheDocument()
  })

  it('should submit form', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(
      <TextareaWysiwygEditableComponent
        name="test"
        value="test"
        onSubmit={onSubmit}
        opened={true}
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)

    expect(onSubmit).toHaveBeenCalled()
  })
})
