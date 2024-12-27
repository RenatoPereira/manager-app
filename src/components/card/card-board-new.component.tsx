'use client'

import './card-board.component.scss'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'
import Tilt from 'react-parallax-tilt'

export const CardBoardNewComponent = () => {
  const t = useTranslations('HomePage')

  return (
    <Link
      href={`/boards/new`}
      className="opacity-80 hover:opacity-100 transition-opacity duration-300"
    >
      <Tilt
        perspective={750}
        transitionSpeed={2000}
        scale={0.98}
        tiltReverse={true}
      >
        <article className="card-board card-board flex flex-col items-center justify-center p-6 gap-2 rounded-lg w-full aspect-video border-2 border-cyan-800/50 dark:border-white/50 text-cyan-900 dark:text-white text-5xl">
          <HiPlus />

          <p className="text-base font-bold">{t('new-board')}</p>
        </article>
      </Tilt>
    </Link>
  )
}
