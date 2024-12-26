import './background.component.scss'

export const BackgroundComponent = () => {
  const squares = Array.from({ length: 10 })

  return (
    <span className="bg-bubbles" data-testid="bg-bubbles">
      {squares.map((_, index) => {
        return <span key={index} data-testid="bubble" />
      })}
    </span>
  )
}
