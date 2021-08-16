import {ReactNode, FC} from 'react'
import clsx from 'clsx'

type Props = {
  children?: ReactNode
  className?: string
}

const Container: FC<Props> = ({className, children}) => {
  return (
    <div
      className={clsx([
        'container mx-auto px-5 sm:px-24 md:px-30 xl:px-52',
        className
      ])}
    >
      {children}
    </div>
  )
}

export default Container
