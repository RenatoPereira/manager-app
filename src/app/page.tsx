import { CardBoardNewComponent } from '@/components/card/card-board-new.component'
import { CardBoardComponent } from '@/components/card/card-board.component'

export default function Home() {
  const boards = [
    { id: '1', title: 'Board 1' },
    { id: '2', title: 'Board 2' },
    { id: '3', title: 'Board 3' }
  ]

  return (
    <section className="size-full flex p-6 gap-4">
      {boards.map((board) => (
        <div className="w-80" key={board.id}>
          <CardBoardComponent id={board.id} title={board.title} />
        </div>
      ))}
      <div className="w-80">
        <CardBoardNewComponent />
      </div>
    </section>
  )
}
