import { render, screen } from '@testing-library/react'

import { CardColumnNewComponent } from './card-column-new.component'

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn()
  }),
  useParams: () => ({
    id: 'test-board-id'
  })
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('ColumnNewComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the new column button with correct text', () => {
    render(<CardColumnNewComponent />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('new-column')).toBeInTheDocument()
  })

  it('contains hidden input with correct board ID', () => {
    render(<CardColumnNewComponent />)

    const hiddenInput = screen.getByRole('textbox', {
      hidden: true
    }) as HTMLInputElement
    expect(hiddenInput).toHaveValue('test-board-id')
  })
})
