import clsx from 'clsx'
import Link from 'next/link'
import {useRouter} from 'next/router'

const navigation = [
  {name: 'Home', href: '/', isActive: (path: string): boolean => path === '/'},
  {
    name: 'Collections',
    href: '/collections',
    isActive: (path: string): boolean => path.includes('/collections')
  },
  {
    name: 'Posts',
    href: '/posts',
    isActive: (path: string): boolean => path.includes('/posts')
  }
]

const NavMenu: React.FC<{className?: string}> = ({className = ''}) => {
  const router = useRouter()

  return (
    <ul className={className}>
      {navigation.map((item) => (
        <li key={item.name}>
          <Link href={item.href}>
            <a
              className={clsx([
                router.pathname === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-900 hover:bg-gray-900 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              ])}
              aria-current={router.pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavMenu
