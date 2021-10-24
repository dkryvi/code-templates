import {DefaultSeo} from 'next-seo'
import {ThemeProvider} from 'next-themes'
import {AppProps} from 'next/app'
import {Toaster} from 'react-hot-toast'

import '@styles/index.css'

import {DEFAULT_SEO} from '@constants'

export default function MyApp({
  Component,
  pageProps
}: AppProps): React.ReactElement {
  return (
    <ThemeProvider>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}
