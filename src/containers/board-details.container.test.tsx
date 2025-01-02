import { act, render, screen } from '@testing-library/react'

import { Board } from '@/@types/board.typr'
import { Column } from '@/@types/column.type'

import { BoardDetailsContainer } from './board-details.container'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

describe('BoardDetailsContainer', () => {
  const mockBoard: Board = {
    id: '1',
    name: 'Test Board',
    description: 'Test Board Description',
    columns: []
  }

  const mockColumns: Column[] = [
    {
      id: '1',
      name: 'To Do',
      tasks: [],
      order: 1
    },
    {
      id: '2',
      name: 'In Progress',
      tasks: [],
      order: 2
    }
  ]

  // Helper function to create resolved promises
  const createResolvedPromise = <T,>(data: T): Promise<T> => {
    return Promise.resolve(data)
  }

  it('renders board name correctly', async () => {
    await act(async () => {
      render(
        <BoardDetailsContainer
          board={createResolvedPromise(mockBoard)}
          columns={createResolvedPromise(mockColumns)}
        />
      )
    })

    expect(screen.getByDisplayValue('Test Board')).toBeInTheDocument()
  })

  it('renders all columns', async () => {
    await act(async () => {
      render(
        <BoardDetailsContainer
          board={createResolvedPromise(mockBoard)}
          columns={createResolvedPromise(mockColumns)}
        />
      )
    })

    const columns = screen.getAllByTestId(/mock-column/)
    expect(columns).toHaveLength(2)
    expect(columns[0]).toHaveTextContent('To Do')
    expect(columns[1]).toHaveTextContent('In Progress')
  })

  it('renders an empty column container at the end', async () => {
    await act(async () => {
      render(
        <BoardDetailsContainer
          board={createResolvedPromise(mockBoard)}
          columns={createResolvedPromise(mockColumns)}
        />
      )
    })

    const containers = screen.getAllByTestId(/mock-column/)
    expect(containers).toHaveLength(mockColumns.length)
  })
})
