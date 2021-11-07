import Link from 'next/link'

import Container from '@components/container'

const NotFoundPage: React.FC = () => (
  <Container className="min-h-screen flex flex-col space-y-8 justify-center items-center text-center ">
    <h1 className="prose text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
      Page Not Found
    </h1>
    <h3 className="prose text-lg leading-relaxed font-light">
      The page you are looking for might have been removed.
    </h3>
    <Link href="/">
      <a className="btn">Come Back Home</a>
    </Link>
  </Container>
)

export default NotFoundPage
