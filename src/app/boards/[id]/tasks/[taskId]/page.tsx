import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { GenericErrorComponent } from '@/components/error/generic.component'
import { BoardDetailsContainer } from '@/containers/board-details.container'
import { LoadingContainer } from '@/containers/loading.container'
import { boardService } from '@/libs/services/board.service'
import { columnService } from '@/libs/services/column.service'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function BoardsDetails({ params }: PageProps) {
  const t = await getTranslations('Error')

  const { id } = await params

  const board = boardService.get(id)
  const columns = columnService.getFromBoard(id)

  return (
    <ErrorBoundary
      fallback={
        <GenericErrorComponent
          title={t('board.title')}
          back={t('board.back')}
        />
      }
    >
      <Suspense
        fallback={
          <section className="w-full py-40">
            <LoadingContainer />
          </section>
        }
      >
        <BoardDetailsContainer board={board} columns={columns} />
      </Suspense>
    </ErrorBoundary>
  )
}
