import { Task } from '@/@types/tasks.type'

import { CardTaskComponent } from '../card/card-task.component'

type Props = {
  id: string
  name: string
  tasks: Task[]
}

export const ColumnComponent = ({ name, tasks }: Props) => {
  return (
    <section
      role="region"
      className="w-full flex flex-col gap-5 dark:bg-violet-950/50 rounded-lg p-4 border border-violet-800/30"
    >
      <h1 className="text-lg font-medium text-cyan-800 dark:text-gray-200 text-center">
        {name}
      </h1>

      <div className="w-full flex flex-col gap-4">
        {tasks?.map((task) => <CardTaskComponent task={task} key={task.id} />)}
      </div>
    </section>
  )
}
