'use client'

import { useEffect, useState } from 'react'
import { CiDark, CiLight } from 'react-icons/ci'

type Props = {
  positionY?: 'top' | 'bottom' | 'center'
  positionX?: 'left' | 'right' | 'center'
  display?: 'static' | 'fixed'
}

export const DarkModeComponent = ({
  positionY = 'bottom',
  positionX = 'right',
  display
}: Props) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = (theme: 'dark' | 'light') => {
    setTheme(theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  const watchTheme = () => {
    if (typeof window === 'undefined') return

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newColorScheme = event.matches ? 'dark' : 'light'
        toggleTheme(newColorScheme)
      })
  }

  const getStyle = () => {
    let y
    let x

    switch (positionY) {
      case 'top':
        y = 'top-4'
        break
      case 'bottom':
        y = 'bottom-4'
        break
      default:
        y = 'top-1/2 -translate-y-1/2'
    }

    switch (positionX) {
      case 'left':
        x = 'left-4'
        break
      case 'right':
        x = 'right-4'
        break
      default:
        x = 'left-1/2 -translate-x-1/2'
    }

    return `flex items-center justify-center size-10 rounded-full bg-primary dark:bg-secondary text-primary-inverted text-2xl ${display} ${y} ${x}`
  }

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      toggleTheme('dark')
    }

    watchTheme()
  }, [])

  return display ? (
    <span data-testid="darkmode-component" className={getStyle()}>
      {theme === 'dark' ? <CiDark /> : <CiLight />}
    </span>
  ) : null
}
