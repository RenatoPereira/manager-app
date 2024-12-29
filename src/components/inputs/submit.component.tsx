import { LoadingComponent } from '../loading/loading.component'

type Props = {
  label: string
  disabled?: boolean
  loading?: boolean
}

export const SubmitComponent = ({ label, disabled, loading }: Props) => {
  return (
    <button
      type="submit"
      className="w-full rounded-md p-2 text-sm bg-sky-700 dark:bg-cyan-900 text-white hover:bg-sky-800 dark:hover:bg-cyan-800 disabled:opacity-50 disabled:pointer-events-none transition-colors duration-300"
      disabled={disabled || loading}
    >
      {loading ? <LoadingComponent scale={0.3} /> : label}
    </button>
  )
}
