import {Provider as SessionProvider} from 'next-auth/client'
import {DefaultSeo} from 'next-seo'
import {ThemeProvider} from 'next-themes'
import {AppProps} from 'next/app'

import '@styles/index.css'

import {DEFAULT_SEO} from '@constants'

export default function MyApp({
  Component,
  pageProps
}: AppProps): React.ReactElement {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
