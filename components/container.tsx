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
        'md:px-30 xl:px-42 container mx-auto px-5 sm:px-6',
        className
      ])}
    >
      {children}
    </div>
  )
}

export default Container
