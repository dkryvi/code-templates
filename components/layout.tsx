import Footer from 'components/footer'
import Nav from 'components/nav'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-8">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
