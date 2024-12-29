import { render, screen } from '@testing-library/react'

import { TextareaComponent } from './textarea.component'

describe('TextareaComponent', () => {
  it('should render textarea with label', () => {
    render(
      <TextareaComponent
        label="Description"
        name="description"
        placeholder="Enter description"
      />
    )

    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument()
  })

  it('should render textarea without label', () => {
    render(<TextareaComponent name="comments" placeholder="Enter comments" />)

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter comments')).toBeInTheDocument()
  })

  it('should show error message when error prop is provided', () => {
    render(
      <TextareaComponent name="bio" placeholder="Bio" error="Bio is required" />
    )

    expect(screen.getByText('Bio is required')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Bio')).toHaveClass('border-red-500')
  })
})
