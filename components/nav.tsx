import {Disclosure, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'

import AuthButton from 'components/auth-button'
import Autocomplete from 'components/autocomplete'

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
                'block px-3 py-2 rounded-md text-base font-medium'
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

const Nav: React.FC = () => {
  return (
    <Disclosure
      as="nav"
      className="bg-white sticky top-0 z-50 border-b border-accent-2"
    >
      {({open}) => {
        const Icon = open ? XIcon : MenuIcon

        return (
          <>
            <div className="px-6 mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-gray-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <Icon
                      className="block h-6 w-6 text-current"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden lg:block">
                    <NavMenu className="flex space-x-4" />
                  </div>
                </div>
                <div className="w-12 sm:w-auto sm:max-w-sm lg:max-w-md md:w-96">
                  <Autocomplete />
                </div>
                <div className="ml-4">
                  <AuthButton />
                </div>
              </div>
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel
                className="lg:hidden z-50 absolute w-full bg-white px-2 pt-2 pb-3 space-y-1 shadow-md"
                unmount
              >
                <NavMenu />
              </Disclosure.Panel>
            </Transition>
          </>
        )
      }}
    </Disclosure>
  )
}

export default Nav
