import { render, screen } from '@testing-library/react'

import { InputComponent } from './input.component'

describe('InputComponent', () => {
  it('should render input with label', () => {
    render(
      <InputComponent
        label="Name"
        name="name"
        placeholder="Enter your name"
        defaultValue="John Doe"
      />
    )

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
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
        error={['Username is required']}
      />
    )

    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toHaveClass(
      'border-red-500'
    )
  })

  it('should show multiple error messages when error prop is provided', () => {
    render(
      <InputComponent
        name="username"
        placeholder="Username"
        error={['Username is required', 'Username is too short']}
      />
    )

    expect(screen.getByText('Username is required')).toBeInTheDocument()
    expect(screen.getByText('Username is too short')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Username')).toHaveClass(
      'border-red-500'
    )
  })
})
