'use client'

import { Transition, TransitionChild } from '@headlessui/react'
import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IoClose } from 'react-icons/io5'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose?: () => void
}

export const ModalComponent = ({ children, isOpen, onClose }: Props) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  return (
    isOpen &&
    createPortal(
      <Transition show={isOpen}>
        <section className="fixed inset-0 z-50 flex items-center justify-center text-center	">
          <TransitionChild>
            <span
              className="fixed inset-0 bg-black/70 transition duration-500 data-[closed]:opacity-0"
              onClick={onClose}
            />

            <button
              className="fixed top-4 right-4 text-4xl text-cyan-800 dark:text-white hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
              onClick={onClose}
            >
              <IoClose />
            </button>
          </TransitionChild>

          <TransitionChild>
            <div className="p-6 bg-white dark:bg-indigo-950/80 rounded-md shadow-md z-10 transition duration-500 data-[closed]:scale-75 data-[closed]:opacity-0">
              {children}
            </div>
          </TransitionChild>
        </section>
      </Transition>,
      document?.body
    )
  )
}
