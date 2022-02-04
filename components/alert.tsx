import {REPOSITORY_URL} from 'config'

import Container from './container'

type Props = {
  preview?: boolean
}

const Alert: React.FC<Props> = () => {
  return (
    <Container>
      <p className="prose block max-w-full py-2 text-center text-sm">
        The source code for this blog is{' '}
        <a
          href={REPOSITORY_URL}
          className="transition-colors duration-200 hover:text-indigo-600"
        >
          available on GitHub
        </a>
        .
      </p>
    </Container>
  )
}

export default Alert
