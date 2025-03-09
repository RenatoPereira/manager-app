import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { GenericErrorComponent } from '@/components/error/generic.component'
import { TaskComponent } from '@/components/task/task.component'
import { BoardDetailsContainer } from '@/containers/board-details.container'
import { LoadingContainer } from '@/containers/loading.container'
import { boardService } from '@/libs/services/board.service'
import { columnService } from '@/libs/services/column.service'
import { taskService } from '@/libs/services/task.service'

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ taskId: string | undefined }>
}

export default async function BoardsDetails({
  params,
  searchParams
}: PageProps) {
  const t = await getTranslations('Error')

  const { id } = await params
  const { taskId } = await searchParams

  const task = taskId ? taskService.get(taskId) : null
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
        {task && <TaskComponent task={task} />}
      </Suspense>
    </ErrorBoundary>
  )
}
