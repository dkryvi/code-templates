import Link from 'next/link'

import Container from 'components/container'

const NotFoundPage: React.FC = () => (
  <Container className="flex min-h-screen flex-col items-center justify-center space-y-8 text-center ">
    <h1 className="prose text-6xl font-bold leading-tight tracking-tighter lg:text-7xl">
      Page Not Found
    </h1>
    <h3 className="prose text-lg font-light leading-relaxed">
      The page you are looking for might have been removed.
    </h3>
    <Link href="/">
      <a className="btn" aria-label="home-link">
        Come Back Home
      </a>
    </Link>
  </Container>
)

export default NotFoundPage
