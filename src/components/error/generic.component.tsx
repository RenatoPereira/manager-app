import Link from 'next/link'

type Props = {
  title: string
  back?: string
  disableButton?: boolean
}

export const GenericErrorComponent = ({
  title,
  back,
  disableButton
}: Props) => {
  return (
    <section
      role="region"
      className="size-full flex flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold text-primary">{title}</h1>

      {!disableButton && (
        <Link
          href="/"
          className="px-4 py-3 bg-primary text-primary-inverted rounded-md text-sm font-bold uppercase cursor-pointer"
        >
          {back}
        </Link>
      )}
    </section>
  )
}
