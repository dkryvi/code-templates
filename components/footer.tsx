import {REPOSITORY_URL} from '@constants'
import Container from 'components/container'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="prose text-4xl lg-text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js.
          </h3>
          <div className="flex flex-col space-y-6 sm:space-y-0 sm:space-x-6 sm:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              className="btn btn-primary"
              href="https://nextjs.org/docs/basic-features/pages"
              target="_blank"
              rel="noreferrer"
            >
              Read Documentation
            </a>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="prose mx-3 font-bold"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
