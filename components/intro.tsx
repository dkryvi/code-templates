import {CMS_NAME} from 'lib/constants'

const Intro: React.FC = () => {
  return (
    <section className="flex-col lg:flex-row flex items-center lg:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-tight lg:pr-8">
        Blog.
      </h1>
      <h4 className="text-left lg:text-left text-lg mt-5 lg:pl-8">
        A statically generated blog example using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and {CMS_NAME}.
      </h4>
    </section>
  )
}

export default Intro
