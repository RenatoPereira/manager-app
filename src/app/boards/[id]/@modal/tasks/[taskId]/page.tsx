import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { GenericErrorComponent } from '@/components/error/generic.component'
import { TaskComponent } from '@/components/task/task.component'
import { LoadingContainer } from '@/containers/loading.container'
import { taskService } from '@/libs/services/task.service'

type PageProps = {
  params: Promise<{ taskId: string }>
}

export default async function TaskDetails({ params }: PageProps) {
  const t = await getTranslations('Error')

  const { taskId } = await params

  const task = await taskService.get(taskId)

  return (
    <ErrorBoundary
      fallback={
        <GenericErrorComponent title={t('task.title')} back={t('task.back')} />
      }
    >
      <Suspense
        fallback={
          <section className="w-full py-40">
            <LoadingContainer />
          </section>
        }
      >
        <TaskComponent task={task} />
      </Suspense>
    </ErrorBoundary>
  )
}
