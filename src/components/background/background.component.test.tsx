import { render, screen } from '@testing-library/react'

import { BackgroundComponent } from './background.component'

describe('BackgroundComponent', () => {
  it('renders the background container', () => {
    render(<BackgroundComponent />)
    const container = screen.getByTestId('bg-bubbles')
    expect(container).toBeInTheDocument()
  })

  it('renders exactly 10 bubble elements', () => {
    render(<BackgroundComponent />)
    const bubbles = screen.getAllByTestId('bubble')
    expect(bubbles).toHaveLength(10)
  })
})
