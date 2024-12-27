import { render, screen } from '@testing-library/react'

import { CardBoardNewComponent } from './card-board-new.component'

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

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

jest.mock('react-parallax-tilt', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

describe('CardBoardNewComponent', () => {
  it('renders the new board card with correct text', () => {
    render(<CardBoardNewComponent />)

    expect(screen.getByText('new-board')).toBeInTheDocument()

    const article = screen.getByRole('article')
    expect(article).toHaveClass(
      'card-board',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'p-6',
      'gap-2',
      'rounded-lg',
      'w-full',
      'aspect-video',
      'border-2',
      'border-cyan-800/50',
      'dark:border-white/50',
      'text-cyan-900',
      'dark:text-white',
      'text-5xl'
    )

    const iconContainer = screen.getByText('new-board').previousSibling
    expect(iconContainer).toBeInTheDocument()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/boards/new')
    expect(link).toHaveClass(
      'opacity-80',
      'hover:opacity-100',
      'transition-opacity',
      'duration-300'
    )
  })
})
