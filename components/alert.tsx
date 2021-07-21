import Container from './container'

import {REPOSITORY_URL} from 'lib/constants'

type Props = {
  preview?: boolean
}

const Alert: React.FC<Props> = () => {
  return (
    <div className="'border-b bg-accent-1 border-accent-2'">
      <Container>
        <div className="py-2 text-center text-sm">
          The source code for this blog is{' '}
          <a
            href={REPOSITORY_URL}
            className="underline hover:text-success duration-200 transition-colors"
          >
            available on GitHub
          </a>
          .
        </div>
      </Container>
    </div>
  )
}

export default Alert
