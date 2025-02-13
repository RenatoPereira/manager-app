import { render, screen } from '@testing-library/react'

import { ColumnDeleteComponent } from './column-delete.component'

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn()
  })
}))

describe('ColumnDeleteComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the new column button with correct text', () => {
    render(<ColumnDeleteComponent columnId="test-column-id" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByLabelText('Delete column')).toBeInTheDocument()
  })

  it('contains hidden input with correct column ID', () => {
    render(<ColumnDeleteComponent columnId="test-column-id" />)

    const hiddenInput = screen.getByRole('textbox', {
      hidden: true
    }) as HTMLInputElement
    expect(hiddenInput).toHaveValue('test-column-id')
  })
})
