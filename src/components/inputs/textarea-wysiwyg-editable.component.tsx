import { useEffect, useRef, useState, useTransition } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { MdOutlineModeEdit } from 'react-icons/md'
import Editor from 'react-simple-wysiwyg'

import { LoadingComponent } from '../loading'

type Props = {
  name: string
  value: string
  onSubmit: (payload: FormData) => void
  hiddenFields?: Field[]
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  error?: string[]
  width?: string
  opened?: boolean
  placeholder?: string
  onCancel?: () => void
}

type Field = {
  name: string
  value: string
}

export const TextareaWysiwygEditableComponent = ({
  name,
  value,
  onSubmit,
  textSize = 'sm',
  error,
  hiddenFields,
  width = 'w-full',
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    setInputValue(e.target?.value || '')
  }

  const handleSubmit = (payload: FormData) => {
    payload.set(name, inputValue)

    startTransition(() => {
      onSubmit(payload)
    })

    cancelEdit()
  }

  useEffect(() => {
    if (!isPending && !hasError) {
      cancelEdit()
    }
  }, [isPending, hasError])

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
    <form className="group w-full flex items-start gap-2" action={handleSubmit}>
      {isEditing ? (
        <div className={width}>
          <Editor
            className={`${width} ${hasError ? 'border-red-500' : 'border-cyan-800/80 dark:border-white/80'} text-${textSize} text-left`}
            value={inputValue}
            onChange={onChange}
            autoFocus
            name={name}
            disabled={!isEditing}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <p
          className={`${width} text-${textSize} text-cyan-900 dark:text-white text-left`}
          data-testid="wysiwyg-content"
           
          dangerouslySetInnerHTML={{ __html: inputValue }}
        />
      )}

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

      <div className={`flex items-center gap-2`}>
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
