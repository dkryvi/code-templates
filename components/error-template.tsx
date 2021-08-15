import Image from 'next/image'
import Link from 'next/link'

import Container from 'components/container'
import Layout from 'components/layout'

type Props = {
  title: string
  subtitle: string
  media: string
}

const ErrorTemplate: React.FC<Props> = ({title, subtitle, media}) => {
  return (
    <Layout>
      <Container>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <Image
          src={media}
          alt={title}
          layout="responsive"
          objectFit="cover"
          width={16}
          height={9}
        />
        <Link href="/">
          <a>
            <button>Come Back Home</button>
          </a>
        </Link>
      </Container>
    </Layout>
  )
}

export default ErrorTemplate
