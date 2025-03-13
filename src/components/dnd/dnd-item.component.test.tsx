import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { DndItemComponent } from './dnd-item.component'

describe('DndItemComponent', () => {
  const mockStyle = { width: '100px', height: '100px' }

  it('renders children correctly', () => {
    render(
      <DndItemComponent style={mockStyle} isDragging={false}>
        <p data-testid="child-element">Test Child</p>
      </DndItemComponent>
    )

    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByTestId('child-element')).toHaveTextContent('Test Child')
  })

  it('applies styles correctly', () => {
    render(
      <DndItemComponent style={mockStyle} isDragging={false}>
        <p>Test Child</p>
      </DndItemComponent>
    )

    const dndItem = screen.getByText('Test Child').parentElement
    expect(dndItem).toHaveStyle('width: 100px')
    expect(dndItem).toHaveStyle('height: 100px')
  })

  it('does not apply dragging classes when isDragging is false', () => {
    render(
      <DndItemComponent style={mockStyle} isDragging={false}>
        <p>Test Child</p>
      </DndItemComponent>
    )

    const dndItem = screen.getByText('Test Child').parentElement
    expect(dndItem).not.toHaveClass('pointer-events-none')
    expect(dndItem).not.toHaveClass('opacity-30')
  })

  it('applies dragging classes when isDragging is true', () => {
    render(
      <DndItemComponent style={mockStyle} isDragging={true}>
        <p>Test Child</p>
      </DndItemComponent>
    )

    const dndItem = screen.getByText('Test Child').parentElement
    expect(dndItem).toHaveClass('pointer-events-none')
    expect(dndItem).toHaveClass('opacity-30')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(
      <DndItemComponent ref={ref} style={mockStyle} isDragging={false}>
        <p>Test Child</p>
      </DndItemComponent>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes additional props to the div', () => {
    render(
      <DndItemComponent
        style={mockStyle}
        isDragging={false}
        data-testid="dnd-item"
      >
        <p>Test Child</p>
      </DndItemComponent>
    )

    expect(screen.getByTestId('dnd-item')).toBeInTheDocument()
  })
})
