import {REPOSITORY_URL} from '@lib/constants'

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
          // className="hover:text-blue-600 duration-200 transition-colors"
        >
          available on GitHub
        </a>
        .
      </p>
    </Container>
  )
}

export default Alert
