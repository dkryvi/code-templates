import React, {Fragment} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {Disclosure, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import clsx from 'clsx'

import Autocomplete from 'components/autocomplete'

const navigation = [
  {name: 'Home', href: '/'},
  {name: 'Collections', href: '/collections'},
  {name: 'Posts', href: '/posts'}
]

const Nav: React.FC = () => {
  const router = useRouter()

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({open}) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx([
                            router.pathname === item.href
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          ])}
                          aria-current={
                            router.pathname === item.href ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-64 max-w sm:max-w-xs lg:max-w-lg sm:w-full">
                <Autocomplete />
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
              as="ul"
              className="sm:hidden z-50 absolute w-full bg-gray-800 px-2 pt-2 pb-3 space-y-1 "
              unmount
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a
                      className={clsx([
                        router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      ])}
                      aria-current={
                        router.pathname === item.href ? 'page' : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default Nav