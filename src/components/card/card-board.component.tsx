'use client'

import './card-board.component.scss'
import Link from 'next/link'
import Tilt from 'react-parallax-tilt'

type Props = {
  id: string
  title: string
}

export const CardBoardComponent = ({ title, id }: Props) => {
  return (
    <Link
      href={`/boards/${id}`}
      className="opacity-80 hover:opacity-100 transition-opacity duration-300"
    >
      <Tilt
        perspective={750}
        transitionSpeed={2000}
        scale={0.98}
        tiltReverse={true}
      >
        <article className="card-board flex flex-col p-6 gap-4 rounded-lg w-full aspect-video bg-gradient-to-br from-cyan-500 dark:from-cyan-900 to-sky-700 dark:to-sky-950">
          <h3 className="text-2xl font-bold text-primary-inverted dark:text-primary">
            {title}
          </h3>
        </article>
      </Tilt>
    </Link>
  )
}
