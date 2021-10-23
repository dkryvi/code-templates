import {Menu, Transition} from '@headlessui/react'
import {signIn, signOut, useSession} from 'next-auth/client'
import Image from 'next/image'
import React from 'react'

import Button from 'components/button'

const AuthButton: React.FC = () => {
  const [session] = useSession()

  const handleSignOutClick = React.useCallback(() => signOut(), [])
  const handleSignInClick = React.useCallback(() => signIn('google'), [])

  return session ? (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">
          {session?.user?.image && (
            <Image
              width={24}
              height={24}
              className="inline-block h-10 w-10 mr-4 rounded-full"
              src={session?.user?.image}
              alt="user avatar"
            />
          )}

          {session?.user?.email}
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
          <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <button
                className="py-2 px-3 hover:bg-gray-900"
                onClick={handleSignOutClick}
              >
                Sign Out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  ) : (
    <Button onClick={handleSignInClick}>Sign in with Google</Button>
  )
}

export default React.memo(AuthButton)
