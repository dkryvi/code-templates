import type {SupabaseClient, Session, User} from '@supabase/supabase-js'
import React from 'react'
import toast from 'react-hot-toast'

interface ContextProps {
  error: Error | null
  user: User | null
  session: Session | null
  signIn: () => void
  signOut: () => void
}

const UserContext = React.createContext<Partial<ContextProps>>({
  error: null,
  user: null,
  session: null
})

interface Props {
  supabase: SupabaseClient
  [key: string]: any
}

export const UserContextProvider = ({
  supabase,
  ...restProps
}: Props): React.ReactElement => {
  const [session, setSession] = React.useState<Session | null>(null)
  const [user, setUser] = React.useState<User | null>(null)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const session = supabase.auth.session()

    setSession(session)
    setUser(session?.user ?? null)
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        // needed if you're doing SSR (getServerSideProps)!
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          credentials: 'same-origin',
          body: JSON.stringify({event, session})
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [supabase.auth])

  React.useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const signIn = React.useCallback(async () => {
    const {error} = await supabase.auth.signIn({
      provider: 'google'
    })

    if (error) setError(error)
  }, [supabase.auth])

  const signOut = React.useCallback(async () => {
    const {error} = await supabase.auth.signOut()
    if (error) setError(error)
  }, [supabase.auth])

  const value = React.useMemo(
    () => ({
      error,
      session,
      user,
      signIn,
      signOut
    }),
    [signIn, signOut, session, user, error]
  )

  return <UserContext.Provider value={value} {...restProps} />
}

export const useUser = (): Partial<ContextProps> => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
