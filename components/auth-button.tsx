import {useSession} from 'next-auth/client'
import Link from 'next/link'
import React from 'react'

import {GithubIcon} from '@icons'

const AuthButton: React.FC = () => {
  const [session] = useSession()

  return session ? (
    <>
      <p>Signed in as {session?.user?.email}</p>
      <Link href="/api/auth/signout">
        <a className="text-gray-900">Sign Out</a>
      </Link>
    </>
  ) : (
    <Link href="/api/auth/signin">
      <a className="group flex align-center py-2 px-6 prose bg-gray-900 hover:bg-white hover:text-gray-900 border border-gray-900 text-white font-bold duration-200 transition-colors">
        <GithubIcon
          className="mr-4 text-white group-hover:text-gray-900"
          fill="currentColor"
        />
        Sign in with GitHub
      </a>
    </Link>
  )
}

export default React.memo(AuthButton)
