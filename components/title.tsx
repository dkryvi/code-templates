import {ReactNode} from 'react'

type Props = {
  children?: ReactNode
}

const Title: React.FC<Props> = ({children}) => {
  return (
    <h1 className="prose mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
      {children}
    </h1>
  )
}

export default Title
