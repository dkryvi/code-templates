import Image from 'next/image'
import Link from 'next/link'

import Container from 'components/container'

type Props = {
  title: string
  subtitle: string
  media: string
}

const ErrorTemplate: React.FC<Props> = ({title, subtitle, media}) => {
  return (
    <Container className="min-h-screen text-center flex flex-col justify-center">
      <div className="mt-8">
        <Image
          src={media}
          alt={title}
          layout="responsive"
          objectFit="cover"
          width={16}
          height={9}
        />
      </div>
      <h1 className="mb-8 text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
        {title}
      </h1>
      <h3 className="text-lg leading-relaxed font-light mb-8">{subtitle}</h3>
      <Link href="/">
        <a className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors">
          Come Back Home
        </a>
      </Link>
    </Container>
  )
}

export default ErrorTemplate
