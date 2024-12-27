import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { setUserLocale } from '@/locales/database.locale'

import { ExampleComponent } from './example.component'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

jest.mock('@/locales/database.locale', () => ({
  setUserLocale: jest.fn()
}))

jest.mock('@/locales/config.locale', () => ({
  locales: ['en', 'pt-br']
}))

describe('ExampleComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all locale buttons', () => {
    render(<ExampleComponent />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent('en')
    expect(buttons[1]).toHaveTextContent('pt-br')
  })

  it('applies correct button styles', () => {
    render(<ExampleComponent />)

    const button = screen.getByText('en')
    expect(button).toHaveClass(
      'rounded-full',
      'border',
      'border-solid',
      'border-transparent',
      'transition-colors',
      'flex',
      'items-center',
      'justify-center',
      'bg-foreground',
      'text-background'
    )
  })

  it('calls setUserLocale when a locale button is clicked', () => {
    render(<ExampleComponent />)

    const enButton = screen.getByText('en')
    fireEvent.click(enButton)

    expect(setUserLocale).toHaveBeenCalledWith('en')
  })

  it('shows loading state during transition', () => {
    // Mock useTransition to simulate loading state
    jest
      .spyOn(React, 'useTransition')
      .mockImplementation(() => [true, jest.fn()])

    render(<ExampleComponent />)

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
