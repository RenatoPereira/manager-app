import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { signIn } from '@/libs/auth'

import { SignInComponent } from './sign-in.component'

jest.mock('@/libs/auth', () => ({
  signIn: jest.fn()
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('SignInComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign in button', () => {
    render(<SignInComponent />)

    const button = screen.getByRole('button', { name: /button/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<SignInComponent />)

    const button = screen.getByRole('button', { name: /button/i })
    expect(button).toHaveClass(
      'p-4',
      'bg-tertiary',
      'text-primary-inverted',
      'rounded-md',
      'text-sm',
      'font-bold',
      'uppercase',
      'cursor-pointer'
    )
  })

  it('calls signIn with "google" provider when form is submitted', async () => {
    const user = userEvent.setup()
    render(<SignInComponent />)

    const button = screen.getByRole('button', { name: /button/i })
    await user.click(button)

    const form = screen.getByRole('form')

    expect(form).toHaveAttribute('action')
    expect(signIn).toHaveBeenCalledWith('google', {
      redirectTo: '/'
    })
  })
})
