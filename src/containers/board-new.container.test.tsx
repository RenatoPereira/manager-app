import { act, render, screen } from '@testing-library/react'

import { BoardNewContainer } from './board-new.container'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('BoardNewContainer', () => {
  it('should render the form with all inputs', () => {
    render(<BoardNewContainer />)

    expect(screen.getByRole('heading')).toHaveTextContent('title')
    expect(screen.getByLabelText('name.label')).toBeInTheDocument()
    expect(screen.getByLabelText('description.label')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('button')
  })

  it('should show loading state when form is submitting', async () => {
    render(<BoardNewContainer />)

    const submitButton = screen.getByRole('button')

    act(() => {
      submitButton.click()
    })

    expect(submitButton.firstChild).toBeTruthy()
    expect(submitButton).toBeDisabled()
  })
})
