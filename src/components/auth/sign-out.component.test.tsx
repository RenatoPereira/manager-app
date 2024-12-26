import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { signOut } from '@/libs/auth'

import { SignOutComponent } from './sign-out.component'

jest.mock('@/libs/auth', () => ({
  signOut: jest.fn()
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('SignOutComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign out button', () => {
    render(<SignOutComponent />)

    const button = screen.getByRole('button', { name: /button/i })
    expect(button).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<SignOutComponent />)

    const button = screen.getByRole('button', { name: /button/i })
    expect(button).toHaveClass(
      'text-primary-inverted',
      'text-xs',
      'cursor-pointer'
    )
  })

  it('calls signOut when form is submitted', async () => {
    const user = userEvent.setup()
    render(<SignOutComponent />)

    const button = screen.getByRole('button', { name: /button/i })
    await user.click(button)

    const form = screen.getByRole('form')

    expect(form).toHaveAttribute('action')
    expect(signOut).toHaveBeenCalledWith({
      redirectTo: '/login'
    })
  })
})
