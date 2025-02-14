import { use } from 'react'

import { Board } from '@/@types/board.typr'
import { Column } from '@/@types/column.type'
import { BoardHeaderComponent } from '@/components/board/board-header.component'
import { CardColumnNewComponent } from '@/components/card/card-column-new.component'
import { ColumnComponent } from '@/components/column/column.component'

type Props = {
  board: Promise<Board>
  columns: Promise<Column[]>
}

export const BoardDetailsContainer = ({ board, columns }: Props) => {
  const boardContent = use(board)
  const items = use(columns)

  return (
    <section className="w-full h-[89vh] flex flex-col gap-6 p-6 flex-nowrap">
      <BoardHeaderComponent board={boardContent} />

      <div className="w-full min-h-full flex gap-6 overflow-x-auto">
        {items.map((item) => (
          <div
            className="w-80 shrink-0"
            key={item.id}
            data-testid={`mock-column-${item.id}`}
          >
            <ColumnComponent id={item.id} name={item.name} tasks={item.tasks} />
          </div>
        ))}

        <div className="w-80 shrink-0">
          <CardColumnNewComponent />
        </div>
      </div>
    </section>
  )
}
