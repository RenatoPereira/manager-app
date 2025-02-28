import { render, screen } from '@testing-library/react'

import { ButtonComponent } from './button.component'

describe('ButtonComponent', () => {
  it('should render button with label', () => {
    render(<ButtonComponent label="Button" />)

    expect(screen.getByRole('button')).toHaveTextContent('Button')
  })

  it('should show loading component when loading prop is true', () => {
    render(<ButtonComponent label="Button" loading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.queryByText('Button')).not.toBeInTheDocument()
    expect(screen.getByRole('button').firstChild).toBeTruthy()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<ButtonComponent label="Button" disabled={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should call action function when button is clicked', () => {
    const action = jest.fn()
    render(<ButtonComponent label="Button" action={action} />)

    screen.getByRole('button').click()

    expect(action).toHaveBeenCalled()
  })

  it('should not call action function when button is disabled', () => {
    const action = jest.fn()
    render(<ButtonComponent label="Button" action={action} disabled={true} />)

    screen.getByRole('button').click()

    expect(action).not.toHaveBeenCalled()
  })

  it('should have primary variant when variant prop is not provided', () => {
    render(<ButtonComponent label="Button" />)

    expect(screen.getByRole('button')).toHaveClass(
      'bg-sky-700 dark:bg-cyan-900 text-white hover:bg-sky-800 dark:hover:bg-cyan-800'
    )
  })

  it('should have secondary variant when variant prop is secondary', () => {
    render(<ButtonComponent label="Button" variant="secondary" />)

    expect(screen.getByRole('button')).toHaveClass(
      'border border-cyan-700 dark:border-cyan-900 text-cyan-600 dark:text-cyan-600 hover:bg-cyan-800 dark:hover:bg-cyan-800 hover:text-white'
    )
  })

  it('should have danger variant when variant prop is danger', () => {
    render(<ButtonComponent label="Button" variant="danger" />)

    expect(screen.getByRole('button')).toHaveClass(
      'border border-red-700 dark:border-red-900 text-red-700 dark:text-red-900 hover:bg-red-800 dark:hover:bg-red-800 hover:text-white'
    )
  })

  it('should have full width when fullWidth prop is true', () => {
    render(<ButtonComponent label="Button" fullWidth={true} />)

    expect(screen.getByRole('button')).toHaveClass('w-full')
  })
})
