import {ReactNode, FC} from 'react'

type Props = {
  children?: ReactNode
}

const Container: FC<Props> = ({children}) => {
  return (
    <div className="container mx-auto px-5 sm:px-24 md:px-44 lg:px-52">
      {children}
    </div>
  )
}

export default Container
