import Link from 'next/link'

import Autocomplete from 'components/autocomplete'

type Props = {
  title?: string
}

const Header: React.FC<Props> = ({title = 'Home.'}) => {
  return (
    <header className="sticky top-0 flex items-center bg-white border-b-2 border-gray-300 p-6 mb-8 z-10">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mr-8">
        <Link href="/">
          <a className="hover:underline">{title}</a>
        </Link>
      </h2>
      <Autocomplete />
    </header>
  )
}

export default Header
