import { render, screen } from '@testing-library/react'

import { DarkModeComponent } from './darkmode.component'

const mockMatchMedia = (matches: boolean) => ({
  matches,
  media: `(prefers-color-scheme: ${matches ? 'dark' : 'light'})`,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  onchange: null,
  dispatchEvent: jest.fn()
})

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      if (query === '(prefers-color-scheme: light)') {
        return mockMatchMedia(true)
      }

      return mockMatchMedia(false)
    })
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('DarkmodeComponent', () => {
  describe('component render', () => {
    it('don`t render when display is undefined', () => {
      render(<DarkModeComponent />)
      const el = screen.queryByTestId('darkmode-component')

      expect(el).not.toBeInTheDocument()
    })

    it('render when display is fixed and have the correct class', () => {
      render(<DarkModeComponent display="fixed" />)
      const el = screen.queryByTestId('darkmode-component')

      expect(el).toBeInTheDocument()
      expect(el).toHaveClass('fixed')
    })

    it('render when display is static and have the correct class', () => {
      render(<DarkModeComponent display="static" />)
      const el = screen.queryByTestId('darkmode-component')

      expect(el).toBeInTheDocument()
      expect(el).toHaveClass('static')
    })

    const positionYCases: ('top' | 'bottom')[] = ['top', 'bottom']

    it.each(positionYCases)(
      'render when display is static and positionY is %s and have the correct class',
      (positionY) => {
        render(<DarkModeComponent display="static" positionY={positionY} />)
        const el = screen.queryByTestId('darkmode-component')

        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`static ${positionY}-4`)
      }
    )

    const positionXCases: ('left' | 'right')[] = ['left', 'right']

    it.each(positionXCases)(
      'render when display is static and positionX is %s and have the correct class',
      (positionX) => {
        render(<DarkModeComponent display="static" positionX={positionX} />)
        const el = screen.queryByTestId('darkmode-component')

        expect(el).toBeInTheDocument()
        expect(el).toHaveClass(`static ${positionX}-4`)
      }
    )

    it('render when display is fixed, positionY is center and positionX is center and have the correct class', () => {
      render(
        <DarkModeComponent
          display="fixed"
          positionY="center"
          positionX="center"
        />
      )
      const el = screen.queryByTestId('darkmode-component')

      expect(el).toBeInTheDocument()
      expect(el).toHaveClass(
        'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
      )
    })
  })

  describe('component behavior', () => {
    it('should not have the dark class when the component is mounted and the user prefers light mode', async () => {
      render(<DarkModeComponent />)

      const documentElement = document.documentElement

      expect(documentElement).not.toHaveClass('dark')
    })

    it('should have the dark class when the component is mounted and the user prefers dark mode', async () => {
      const matchMediaMock = window.matchMedia as jest.Mock

      matchMediaMock.mockImplementation((query) => {
        if (query === '(prefers-color-scheme: dark)') {
          return mockMatchMedia(true)
        }

        return mockMatchMedia(false)
      })

      render(<DarkModeComponent />)

      const documentElement = document.documentElement

      expect(documentElement).toHaveClass('dark')
    })
  })
})
