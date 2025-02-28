import { LoadingComponent } from '@/components/loading/loading.component'

type Props = {
  label: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  action?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

export const ButtonComponent = ({
  label,
  disabled,
  loading,
  type = 'submit',
  action,
  variant = 'primary',
  fullWidth = false
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (action) {
      e.preventDefault()
      action()
    }
  }

  const variantClasses = {
    primary:
      'bg-sky-700 dark:bg-cyan-900 text-white hover:bg-sky-800 dark:hover:bg-cyan-800',
    secondary:
      'border border-cyan-700 dark:border-cyan-900 text-cyan-600 dark:text-cyan-600 hover:bg-cyan-800 dark:hover:bg-cyan-800 hover:text-white',
    danger:
      'border border-red-700 dark:border-red-900 text-red-700 dark:text-red-900 hover:bg-red-800 dark:hover:bg-red-800 hover:text-white'
  }

  return (
    <button
      type={type}
      className={`w-full rounded-md p-2 text-sm ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : 'w-fit'
      } disabled:opacity-50 disabled:pointer-events-none transition-colors duration-300 cursor-pointer`}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading ? <LoadingComponent scale={0.3} /> : label}
    </button>
  )
}
