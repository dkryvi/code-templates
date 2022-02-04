import Container from 'components/container'
import {REPOSITORY_URL} from 'config'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-accent-2 bg-white">
      <Container>
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="lg-text-5xl prose mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left">
            Statically Generated with Next.js.
          </h3>
          <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6 lg:w-1/2 lg:pl-4">
            <a
              className="btn"
              href="https://nextjs.org/docs/basic-features/pages"
              target="_blank"
              rel="noreferrer"
              aria-label="read-documentation"
            >
              Read Documentation
            </a>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="prose mx-3 font-bold"
              aria-label="view-on-github"
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
