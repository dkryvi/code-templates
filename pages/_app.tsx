import {DefaultSeo} from 'next-seo'
import {ThemeProvider} from 'next-themes'
import {AppProps} from 'next/app'
import {Toaster} from 'react-hot-toast'

import '@styles/index.css'

import {DEFAULT_SEO} from '@constants'

import {UserContextProvider} from '../context/user'
import supabase from '../lib/supabase'

export default function MyApp({
  Component,
  pageProps
}: AppProps): React.ReactElement {
  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      <UserContextProvider supabase={supabase}>
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />
      </UserContextProvider>
    </ThemeProvider>
  )
}
