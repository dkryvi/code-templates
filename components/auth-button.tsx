import {signIn, signOut, useSession} from 'next-auth/client'
import React from 'react'

import {GithubIcon} from '@icons'

const AuthButton: React.FC = () => {
  const [session] = useSession()

  const handleSignInClick = () => signIn()
  const handleSignOutClick = () => signOut()

  return session ? (
    <>
      <p>Signed in as {session?.user?.email}</p>
      <button className="text-gray-900" onClick={handleSignInClick}>
        Sign Out
      </button>
    </>
  ) : (
    <button
      className="group flex align-center py-2 px-6 prose bg-gray-900 hover:bg-white hover:text-gray-900 border border-gray-900 text-white font-bold duration-200 transition-colors"
      onClick={handleSignOutClick}
    >
      <GithubIcon
        className="mr-4 text-white group-hover:text-gray-900"
        fill="currentColor"
      />
      Sign in with GitHub
    </button>
  )
}

export default React.memo(AuthButton)
