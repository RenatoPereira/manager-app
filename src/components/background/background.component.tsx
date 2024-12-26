import './background.component.scss'

export const BackgroundComponent = () => {
  const squares = Array.from({ length: 10 })

  return (
    <span className="bg-squares" data-testid="bg-squares">
      {squares.map((_, index) => {
        return <span key={index} data-testid="square" />
      })}
    </span>
  )
}
