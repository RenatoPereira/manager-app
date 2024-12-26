import { render, screen } from '@testing-library/react'

import { LoadingComponent } from './loading.component'

describe('LoadingComponent', () => {
  it('renders the loading component', () => {
    render(<LoadingComponent />)

    const loadingComponent = screen.getByTestId('loading-component')
    expect(loadingComponent).toBeInTheDocument()
  })

  it('renders 5 loading bubbles', () => {
    render(<LoadingComponent />)

    const loadingBubbles = screen.getAllByTestId('loading-bubble')
    expect(loadingBubbles).toHaveLength(5)
  })

  it('applies the correct scale transform when scale prop is provided', () => {
    const scale = 2
    render(<LoadingComponent scale={scale} />)

    const loadingComponent = screen.getByTestId('loading-component')
    expect(loadingComponent).toHaveStyle({ transform: `scale(${scale})` })
  })

  it('applies the correct scale transform when scale prop is provided', () => {
    const scale = 0.2
    render(<LoadingComponent scale={scale} />)

    const loadingComponent = screen.getByTestId('loading-component')
    expect(loadingComponent).toHaveStyle({ transform: `scale(${scale})` })
  })

  it('uses default scale of 1 when no scale prop is provided', () => {
    render(<LoadingComponent />)

    const loadingComponent = screen.getByTestId('loading-component')
    expect(loadingComponent).toHaveStyle({ transform: 'scale(1)' })
  })
})
