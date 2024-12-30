import { act, render, screen } from '@testing-library/react'

import { Board } from '@/@types/board.typr'

import { BoardContainer } from './board.container'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('BoardContainer', () => {
  const mockBoards = [
    {
      id: '1',
      name: 'Board 1',
      description: 'Board 1 description',
      columns: []
    },
    {
      id: '2',
      name: 'Board 2',
      description: 'Board 2 description',
      columns: []
    },
    {
      id: '3',
      name: 'Board 3',
      description: 'Board 3 description',
      columns: []
    }
  ]

  it('renders all boards and new board card', async () => {
    const promiseBoards: Promise<Board[]> = new Promise((resolve) =>
      resolve(mockBoards)
    )
    await act(async () => {
      render(<BoardContainer boards={promiseBoards} />)
    })

    mockBoards.forEach(async (board) => {
      expect(await screen.findByText(board.name)).toBeInTheDocument()
      expect(await screen.findByText(board.description)).toBeInTheDocument()
    })

    expect(await screen.findByText('new-board')).toBeInTheDocument()
  })

  it('renders with empty boards array', async () => {
    await act(async () => {
      render(<BoardContainer boards={Promise.resolve([])} />)
    })

    expect(await screen.findByText('new-board')).toBeInTheDocument()
    expect(screen.queryAllByTestId(/board-card-/)).toHaveLength(0)
  })

  it('maintains correct layout classes', async () => {
    const promiseBoards: Promise<Board[]> = new Promise((resolve) =>
      resolve(mockBoards)
    )
    await act(async () => {
      render(<BoardContainer boards={promiseBoards} />)
    })

    const section = screen.getByRole('region')
    expect(section).toHaveClass(
      'size-full',
      'flex',
      'p-6',
      'gap-4',
      'flex-wrap',
      'content-start'
    )

    const boardCards = screen.getAllByTestId(/board-card/)
    expect(boardCards).toHaveLength(mockBoards.length)
  })
})
