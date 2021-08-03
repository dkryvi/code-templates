import {ArrowUpIcon, ClipboardCopyIcon} from '@heroicons/react/outline'

import Alert from 'components/alert'
import Footer from 'components/footer'
import Meta from 'components/meta'
import copyToClipboard from 'lib/utils/copy-to-clipboard'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  const scrollToTop = () =>
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

  const copyLink = () => {
    copyToClipboard(window.location.href)
    alert('Link copied to clipboard')
  }

  return (
    <>
      <Meta />
      <main className="min-h-screen">
        {children}
        <div className="fixed right-8 bottom-8 flex flex-col space-y-4">
          <button
            className="p-4 rounded-full bg-white shadow-md hover:shadow-xl"
            onClick={scrollToTop}
          >
            <ArrowUpIcon className="w-6 h-6" />
          </button>
          <button
            className="p-4 rounded-full bg-white shadow-md hover:shadow-xl"
            onClick={copyLink}
          >
            <ClipboardCopyIcon className="w-6 h-6" />
          </button>
        </div>
      </main>
      <Footer />
      <Alert />
    </>
  )
}

export default Layout
