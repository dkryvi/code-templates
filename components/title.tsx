import {ReactNode} from 'react'

type Props = {
  children?: ReactNode
}

const Title: React.FC<Props> = ({children}) => {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left text-black">
      {children}
    </h1>
  )
}

export default Title
