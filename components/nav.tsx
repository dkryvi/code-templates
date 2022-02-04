import {Disclosure, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'

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

const Nav: React.FC = () => {
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 border-b border-accent-2 bg-white"
    >
      {({open}) => {
        const Icon = open ? XIcon : MenuIcon

        return (
          <>
            <div className="mx-auto px-6 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
              <div className="relative flex h-16 items-center justify-between">
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
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden lg:block">
                    <NavMenu className="flex space-x-4" />
                  </div>
                </div>
                <div className="w-12 sm:w-auto sm:max-w-sm md:w-96 lg:max-w-md">
                  <Autocomplete />
                </div>
              </div>
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Disclosure.Panel
                className="absolute z-50 w-full space-y-1 bg-white px-2 pt-2 pb-3 shadow-md lg:hidden"
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
