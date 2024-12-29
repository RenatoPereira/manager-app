import { InputHTMLAttributes } from 'react'

type Props = {
  label?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  name: string
  placeholder: string
  error?: string
}

export const InputComponent = ({
  label,
  type = 'text',
  name,
  placeholder,
  error
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-2">
      {label && (
        <label
          className="text-sm font-medium text-cyan-900 dark:text-white pl-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <input
        className={`w-full rounded-md py-2 px-3 bg-transparent border text-sm text-cyan-900 dark:text-white ${error ? 'border-red-500' : 'border-cyan-800/80 dark:border-white/80'}`}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
