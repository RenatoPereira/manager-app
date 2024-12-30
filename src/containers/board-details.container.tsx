import { use } from 'react'

import { Board } from '@/@types/board.typr'
import { Column } from '@/@types/column.type'
import { ColumnComponent } from '@/components/column/column.component'

type Props = {
  board: Promise<Board>
  columns: Promise<Column[]>
}

export const BoardDetailsContainer = ({ board, columns }: Props) => {
  const boardContent = use(board)
  const items = use(columns)

  return (
    <section className="w-full flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-medium text-cyan-800 dark:text-white">
        {boardContent.name}
      </h1>

      <div className="w-full flex gap-6">
        {items.map((item) => (
          <div
            className="w-80"
            key={item.id}
            data-testid={`mock-column-${item.id}`}
          >
            <ColumnComponent id={item.id} name={item.name} tasks={item.tasks} />
          </div>
        ))}

        <div className="w-80"></div>
      </div>
    </section>
  )
}
