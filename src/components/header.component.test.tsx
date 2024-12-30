import { screen } from '@testing-library/react'

import { auth } from '@/libs/auth'
import { renderAsync } from '@/libs/helpers/testing.helper'

import { HeaderComponent } from './header.component'

jest.mock('@/libs/auth', () => ({
  auth: jest.fn()
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('HeaderComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the app title as a link', async () => {
    ;(auth as jest.Mock).mockResolvedValue(null)

    await renderAsync(HeaderComponent, {})

    const titleLink = screen.getByRole('link', { name: 'Manager APP' })
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', '/')
  })

  it('renders user avatar when session exists', async () => {
    ;(auth as jest.Mock).mockResolvedValue({
      user: {
        image: 'https://example.com/avatar.jpg'
      }
    })

    await renderAsync(HeaderComponent, {})

    const avatar = screen.getByAltText('User Avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', expect.stringContaining('avatar.jpg'))
  })

  it('does not render avatar when session does not exist', async () => {
    ;(auth as jest.Mock).mockResolvedValue(null)

    await renderAsync(HeaderComponent, {})

    expect(screen.queryByAltText('User Avatar')).not.toBeInTheDocument()
  })

  it('does not render avatar when user has no image', async () => {
    ;(auth as jest.Mock).mockResolvedValue({
      user: {
        image: null
      }
    })

    await renderAsync(HeaderComponent, {})

    expect(screen.queryByAltText('User Avatar')).not.toBeInTheDocument()
  })
})
