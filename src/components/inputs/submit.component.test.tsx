import { render, screen } from '@testing-library/react'

import { SubmitComponent } from './submit.component'

describe('SubmitComponent', () => {
  it('should render submit button with label', () => {
    render(<SubmitComponent label="Submit" />)

    expect(screen.getByRole('button')).toHaveTextContent('Submit')
  })

  it('should show loading component when loading prop is true', () => {
    render(<SubmitComponent label="Submit" loading={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
    // Assuming LoadingComponent has a test-id, you could check for it
    expect(screen.getByRole('button').firstChild).toBeTruthy()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<SubmitComponent label="Submit" disabled={true} />)

    expect(screen.getByRole('button')).toBeDisabled()
  })
})
