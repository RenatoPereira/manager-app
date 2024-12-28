import { use } from 'react'

import { Board } from '@/@types/board'
import { CardBoardNewComponent } from '@/components/card/card-board-new.component'
import { CardBoardComponent } from '@/components/card/card-board.component'

type Props = {
  boards: Promise<Board[]>
}

export const BoardContainer = ({ boards }: Props) => {
  const items = use(boards)

  return (
    <section className="size-full flex p-6 gap-4">
      {items.map((item) => (
        <div className="w-80" key={item.id}>
          <CardBoardComponent id={item.id} title={item.name} />
        </div>
      ))}
      <div className="w-80">
        <CardBoardNewComponent />
      </div>
    </section>
  )
}
