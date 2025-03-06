import Link from 'next/link'

import { Task } from '@/@types/tasks.type'
import { limitString, sanitizeString } from '@/libs/helpers/string.helper'

type Props = {
  task: Task
}

export const CardTaskComponent = ({ task }: Props) => {
  const { id, name, boardId, description } = task

  return (
    <Link href={`/boards/${boardId}/tasks/${id}`}>
      <article className="flex flex-col gap-2 p-4 dark:bg-violet-950/50 border-l-4 border-violet-800/50 hover:bg-teal-50/20 dark:hover:bg-violet-900/30 transition-colors duration-300 rounded-md shadow-md">
        <h4 className="text-sm font-medium text-cyan-900 dark:text-white">
          {name}
        </h4>

        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {limitString(sanitizeString(description), 100)}
          </p>
        )}
      </article>
    </Link>
  )
}
