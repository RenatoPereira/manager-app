import { render, screen } from '@testing-library/react'

import { CardBoardComponent } from './card-board.component'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <a role="link" {...props}>
      {children}
    </a>
  )
}))

jest.mock('react-parallax-tilt', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

describe('CardBoardComponent', () => {
  const mockProps = {
    id: 'test-board-id',
    title: 'Test Board Title'
  }

  it('renders the board title', () => {
    render(<CardBoardComponent {...mockProps} />)

    expect(screen.getByText('Test Board Title')).toBeInTheDocument()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/boards/test-board-id')

    const article = screen.getByRole('article')
    expect(article).toHaveClass(
      'card-board',
      'flex',
      'flex-col',
      'p-6',
      'gap-4',
      'rounded-lg',
      'w-full',
      'aspect-video'
    )

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveClass(
      'text-2xl',
      'font-bold',
      'text-primary-inverted',
      'dark:text-primary'
    )
  })
})
