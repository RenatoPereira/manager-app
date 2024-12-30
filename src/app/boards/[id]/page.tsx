import { Suspense } from 'react'

import { BoardDetailsContainer } from '@/containers/board-details.container'
import { LoadingContainer } from '@/containers/loading.container'
import { boardService } from '@/libs/services/board.service'
import { columnService } from '@/libs/services/column.service'

type PageProps = {
  params: {
    id: string
  }
}

export const BoardsDetails = async ({ params }: PageProps) => {
  const { id } = await params

  const board = boardService.get(id)
  const columns = columnService.getFromBoard(id)

  return (
    <Suspense
      fallback={
        <section className="w-full py-40">
          <LoadingContainer />
        </section>
      }
    >
      <BoardDetailsContainer board={board} columns={columns} />
    </Suspense>
  )
}

export default BoardsDetails
