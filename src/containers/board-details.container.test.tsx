import { act, render, screen } from '@testing-library/react'

import { Board } from '@/@types/board.typr'
import { Column } from '@/@types/column.type'

import { BoardDetailsContainer } from './board-details.container'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}))

jest.mock('@/components/column/column-new.component', () => ({
  ColumnNewComponent: () => <div>ColumnNewComponent</div>
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
      order: 1,
      boardId: '1'
    },
    {
      id: '2',
      name: 'In Progress',
      tasks: [],
      order: 2,
      boardId: '1'
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

    const columns = screen.getAllByRole('region')
    expect(columns).toHaveLength(2)
    expect(columns[0].querySelector('input')).toHaveDisplayValue('To Do')
    expect(columns[1].querySelector('input')).toHaveDisplayValue('In Progress')
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

    const columns = screen.getAllByRole('region')
    expect(columns).toHaveLength(mockColumns.length)
  })
})
