'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { MdOutlineModeEdit } from 'react-icons/md'

import { LoadingComponent } from '@/components/loading/loading.component'

type Props = {
  name: string
  value: string
  onSubmit: (payload: FormData) => void
  hiddenFields?: Field[]
  textSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  error?: string[]
  width?: string
}

type Field = {
  name: string
  value: string
}

export const InputEditableComponent = ({
  name,
  value,
  onSubmit,
  textSize = 'sm',
  error,
  hiddenFields,
  width = ''
}: Props) => {
  const hasError = error && error.length > 0

  const [isPending, startTransition] = useTransition()

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    setIsEditing(true)
    inputRef.current?.focus()
  }

  const cancelEdit = () => {
    setIsEditing(false)
  }

  const handleSubmit = (payload: FormData) => {
    startTransition(() => {
      onSubmit(payload)
    })

    cancelEdit()
  }

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value)
    }
  }, [isEditing, value])

  return isPending ? (
    <LoadingComponent scale={0.5} />
  ) : (
    <form
      className="group w-full flex items-center gap-2"
      action={handleSubmit}
    >
      <input
        ref={inputRef}
        role="textbox"
        type="text"
        name={name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`${width} py-2 bg-transparent border-b text-${textSize} outline-none text-cyan-900 dark:text-white ${
          isEditing
            ? hasError
              ? 'border-red-500'
              : 'border-cyan-800/80 dark:border-white/80'
            : 'border-transparent pointer-events-none'
        }`}
      />

      {hiddenFields?.map((field) => (
        <input
          role="none"
          hidden={true}
          type="hidden"
          name={field.name}
          value={field.value}
          key={field.name}
        />
      ))}

      <div
        className={`flex items-center gap-2 opacity-0 transition-opacity duration-300 ease-in-out ${
          isEditing ? 'opacity-100' : 'group-hover:opacity-100'
        }`}
      >
        {!isEditing ? (
          <button
            role="button"
            type="button"
            onClick={handleEdit}
            aria-label="Edit"
          >
            <MdOutlineModeEdit />
          </button>
        ) : (
          <>
            <button
              role="button"
              type="button"
              onClick={cancelEdit}
              aria-label="Cancel"
            >
              <IoClose />
            </button>

            <button role="button" type="submit" aria-label="Submit">
              <IoMdCheckmark />
            </button>
          </>
        )}
      </div>
    </form>
  )
}
