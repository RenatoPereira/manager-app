'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ModalConfirmComponent } from './modal/modal-confirm.component'

type Props = {
  children: React.ReactNode
  options: OptionProps[]
}

type OptionProps = {
  label: string
  action: () => void
  criticalAction?: boolean
}

export const DropdownComponent = ({ children, options }: Props) => {
  const t = useTranslations('BoardDetails')

  const [isOpen, setIsOpen] = useState(false)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [option, setOption] = useState<OptionProps | null>(null)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOptionClick = (option: OptionProps) => {
    setOption(option)
    setIsConfirmOpen(true)
  }

  const onConfirm = () => {
    option?.action()
    onCancel()
  }

  const onCancel = () => {
    setIsConfirmOpen(false)
    setOption(null)
  }

  return (
    <>
      <div className="relative block">
        <span
          data-testid="dropdown-overlay"
          className={`fixed top-0 left-0 w-screen h-screen ${
            isOpen ? 'block' : 'hidden'
          }`}
          onClick={handleClose}
        />

        <button
          role="button"
          aria-label={t('settings.toggle')}
          className="relative z-10"
          onClick={handleOpen}
        >
          {children}
        </button>

        <ul
          role="menu"
          className={`absolute top-full right-0 rounded-md bg-white dark:bg-indigo-950/80 shadow-md z-10 transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {options.map((option) => (
            <li key={option.label} className="w-full">
              <button
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer hover:bg-sky-200 dark:hover:bg-indigo-900/30 transition-colors duration-300 text-sm font-medium whitespace-nowrap py-2 px-4 ${
                  option.criticalAction
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-cyan-800 dark:text-white'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ModalConfirmComponent
        title={`Are you sure you want to ${option?.label}?`}
        description="This action cannot be undone."
        isOpen={isConfirmOpen}
        onConfirm={onConfirm}
        onClose={onCancel}
      />
    </>
  )
}
