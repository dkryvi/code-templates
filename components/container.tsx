import clsx from 'clsx'
import {ReactNode, FC} from 'react'

type Props = {
  children?: ReactNode
  className?: string
}

const Container: FC<Props> = ({className, children}) => {
  return (
    <div
      className={clsx([
        'container mx-auto px-5 sm:px-12 md:px-30 xl:px-42',
        className
      ])}
    >
      {children}
    </div>
  )
}

export default Container
