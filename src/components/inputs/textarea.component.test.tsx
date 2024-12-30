import { render, screen } from '@testing-library/react'

import { TextareaComponent } from './textarea.component'

describe('TextareaComponent', () => {
  it('should render textarea with label', () => {
    render(
      <TextareaComponent
        label="Description"
        name="description"
        placeholder="Enter description"
        defaultValue="Lorem ipsum dolor sit amet"
      />
    )

    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('Lorem ipsum dolor sit amet')
    ).toBeInTheDocument()
  })

  it('should render textarea without label', () => {
    render(<TextareaComponent name="comments" placeholder="Enter comments" />)

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter comments')).toBeInTheDocument()
  })

  it('should show error message when error prop is provided', () => {
    render(
      <TextareaComponent
        name="bio"
        placeholder="Bio"
        error={['Bio is required']}
      />
    )

    expect(screen.getByText('Bio is required')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Bio')).toHaveClass('border-red-500')
  })

  it('should show multiple error messages when error prop is provided', () => {
    render(
      <TextareaComponent
        name="bio"
        placeholder="Bio"
        error={['Bio is required', 'Bio is too short']}
      />
    )

    expect(screen.getByText('Bio is required')).toBeInTheDocument()
    expect(screen.getByText('Bio is too short')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Bio')).toHaveClass('border-red-500')
  })
})
