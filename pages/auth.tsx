import {Auth} from '@supabase/ui'
import type {GetServerSideProps} from 'next'

import Container from 'components/container'
import supabase from 'lib/supabase'

const Login: React.FC = () => {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container className="max-w-md h-screen flex items-center">
        <Auth supabaseClient={supabase} providers={['google']} socialColors />
      </Container>
    </Auth.UserContextProvider>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {user} = await supabase.auth.api.getUserByCookie(req)

  if (user) {
    return {props: {}, redirect: {destination: '/', permanent: false}}
  }

  return {props: {}}
}
