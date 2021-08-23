import {AppProps} from 'next/app'
import {DefaultSeo} from 'next-seo'

import 'styles/index.css'

import {DEFAULT_SEO} from 'lib/constants'

export default function MyApp({
  Component,
  pageProps
}: AppProps): React.ReactElement {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </>
  )
}
