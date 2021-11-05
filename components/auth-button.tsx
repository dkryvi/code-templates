import {Menu, Transition} from '@headlessui/react'
import Image from 'next/image'
import React from 'react'

import {useUser} from 'context/user'

const AuthButton: React.FC = () => {
  const {session, signIn, signOut} = useUser()

  return session ? (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center justify-center w-full sm:px-4 py-2 text-sm font-medium text-white sm:bg-gray-900 sm:rounded-md">
          {session?.user?.user_metadata?.avatar_url && (
            <div className="w-12 h-12 inline-flex sm:w-6 sm:h-6 sm:mr-4">
              <Image
                width="100%"
                height="100%"
                className="rounded-full"
                src={session?.user?.user_metadata?.avatar_url}
                alt="user avatar"
              />
            </div>
          )}
          <p className="prose text-white hidden sm:inline-block">
            {session?.user?.email}
          </p>
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  className="w-full py-2 px-2 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  ) : (
    <button className="btn btn-primary" onClick={signIn}>
      Sign in with Google
    </button>
  )
}

export default React.memo(AuthButton)
