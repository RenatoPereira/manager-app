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
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  error?: string[]
  width?: string
  opened?: boolean
  onCancel?: () => void
  placeholder?: string
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
  width = '',
  opened = false,
  placeholder = '',
  onCancel
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
    onCancel?.()
  }

  const handleSubmit = (payload: FormData) => {
    startTransition(() => {
      onSubmit(payload)
    })

    cancelEdit()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setInputValue(e.target?.value || '')
  }

  useEffect(() => {
    if (opened) {
      handleEdit()
    }
  }, [opened])

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
        onChange={onChange}
        className={`${width} py-2 bg-transparent border-b text-${textSize} outline-none text-cyan-900 dark:text-white ${
          isEditing
            ? hasError
              ? 'border-red-500'
              : 'border-cyan-800/80 dark:border-white/80'
            : 'border-transparent pointer-events-none'
        }`}
        placeholder={placeholder}
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
            className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
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
              className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
              role="button"
              type="button"
              onClick={cancelEdit}
              aria-label="Cancel"
            >
              <IoClose />
            </button>

            <button
              className="cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
              role="button"
              type="submit"
              aria-label="Submit"
            >
              <IoMdCheckmark />
            </button>
          </>
        )}
      </div>
    </form>
  )
}
