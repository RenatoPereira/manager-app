import './loading.component.scss'

type Props = {
  scale?: number
}

export const LoadingComponent = ({ scale = 1 }: Props) => {
  const bubbles = Array.from({ length: 5 })

  return (
    <div
      data-testid="loading-component"
      className="loading-bubbles"
      style={{ transform: `scale(${scale})` }}
    >
      {bubbles.map((_, index) => {
        return <span key={index} data-testid="loading-bubble" />
      })}
    </div>
  )
}
