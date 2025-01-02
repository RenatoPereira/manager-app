import { screen } from '@testing-library/react'

import { renderAsync } from '@/libs/helpers/testing.helper'

import { LoadingContainer } from './loading.container'

jest.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) => key
}))

describe('LoadingContainer', () => {
  it('should render loading component with translated text', async () => {
    await renderAsync(LoadingContainer, {})

    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('should have correct layout classes', async () => {
    await renderAsync(LoadingContainer, {})

    const section = screen.getByRole('section')
    expect(section).toHaveClass(
      'size-full',
      'flex',
      'p-6',
      'gap-4',
      'items-center',
      'justify-center'
    )
  })
})
