import { render, screen } from '@testing-library/react'

import { GenericErrorComponent } from './generic.component'

describe('GenericErrorComponent', () => {
  it('renders the title correctly', () => {
    render(<GenericErrorComponent title="Test Error" back="Go Back" />)
    expect(screen.getByText('Test Error')).toBeInTheDocument()
  })

  it('renders the back button with correct text when not disabled', () => {
    render(<GenericErrorComponent title="Error" back="Return Home" />)
    const link = screen.getByRole('link')
    expect(link).toHaveTextContent('Return Home')
    expect(link).toHaveAttribute('href', '/')
  })

  it('does not render the back button when disableButton is true', () => {
    render(
      <GenericErrorComponent
        title="Error"
        back="Return Home"
        disableButton={true}
      />
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    render(<GenericErrorComponent title="Error" back="Go Back" />)

    const section = screen.getByRole('region')
    expect(section).toHaveClass(
      'size-full',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-8'
    )

    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'text-primary')

    const link = screen.getByRole('link')
    expect(link).toHaveClass(
      'px-4',
      'py-3',
      'bg-primary',
      'text-primary-inverted',
      'rounded-md',
      'text-sm',
      'font-bold',
      'uppercase',
      'cursor-pointer'
    )
  })
})
