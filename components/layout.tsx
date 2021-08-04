import Alert from 'components/alert'
import Footer from 'components/footer'
import Meta from 'components/meta'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Meta />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Alert />
    </>
  )
}

export default Layout
