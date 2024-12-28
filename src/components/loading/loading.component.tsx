import './loading.component.scss'

type Props = {
  text?: string
  scale?: number
}

export const LoadingComponent = ({ text, scale = 1 }: Props) => {
  const bubbles = Array.from({ length: 5 })

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div
        data-testid="loading-component"
        className="loading-bubbles"
        style={{ transform: `scale(${scale})` }}
      >
        {bubbles.map((_, index) => {
          return <span key={index} data-testid="loading-bubble" />
        })}
      </div>
      {text && (
        <p className="text-sm text-primary dark:text-primary-inverted">
          {text}
        </p>
      )}
    </div>
  )
}
