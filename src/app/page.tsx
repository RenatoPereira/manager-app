import { Suspense } from 'react'

import { BoardContainer } from '@/containers/board.container'
import { LoadingContainer } from '@/containers/loading.container'
import { boardService } from '@/libs/services/board.service'

export default async function Home() {
  const boards = boardService.getAll()

  return (
    <Suspense
      fallback={
        <section className="w-full py-40">
          <LoadingContainer />
        </section>
      }
    >
      <BoardContainer boards={boards} />
    </Suspense>
  )
}
