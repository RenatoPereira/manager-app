import { render, screen } from '@testing-library/react'

import { InputComponent } from './input.component'

describe('InputComponent', () => {
  it('should render input with label', () => {
    render(
      <InputComponent label="Name" name="name" placeholder="Enter your name" />
    )

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('should render input without label', () => {
    render(<InputComponent name="email" placeholder="Enter your email" />)

    expect(screen.queryByRole('label')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('should show error message when error prop is provided', () => {
    render(
      <InputComponent
        name="username"
        placeholder="Username"
        error="Username is required"
      />
    )

    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toHaveClass(
      'border-red-500'
    )
  })
})
