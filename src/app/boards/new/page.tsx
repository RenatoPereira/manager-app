import { Suspense } from 'react'

import { BoardNewContainer } from '@/containers/board-new.container'
import { LoadingContainer } from '@/containers/loading.container'

export default function BoardsNew() {
  return (
    <Suspense
      fallback={
        <section className="w-full py-40">
          <LoadingContainer />
        </section>
      }
    >
      <BoardNewContainer />
    </Suspense>
  )
}
