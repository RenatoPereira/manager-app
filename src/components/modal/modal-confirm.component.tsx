import { useTranslations } from 'next-intl'

import { ModalComponent } from './modal.component'

type Props = {
  title: string
  description: string
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

export const ModalConfirmComponent = ({
  title,
  description,
  isOpen,
  onConfirm,
  onClose
}: Props) => {
  const t = useTranslations('ManagerApp')

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-cyan-800 dark:text-white">
          {title}
        </h2>

        <p className="text-base text-cyan-800 dark:text-white">{description}</p>

        <div className="flex gap-4 w-full pt-2">
          <button
            className="bg-red-800 text-white px-4 py-2 rounded-md w-full cursor-pointer"
            aria-label={t('modal.cancel')}
            onClick={onClose}
          >
            {t('modal.cancel')}
          </button>

          <button
            className="bg-cyan-800 text-white px-4 py-2 rounded-md w-full cursor-pointer"
            aria-label={t('modal.confirm')}
            onClick={handleConfirm}
          >
            {t('modal.confirm')}
          </button>
        </div>
      </div>
    </ModalComponent>
  )
}
