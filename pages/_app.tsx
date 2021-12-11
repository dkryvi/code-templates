import {DefaultSeo} from 'next-seo'
import {ThemeProvider} from 'next-themes'
import {AppProps} from 'next/app'
import Script from 'next/script'
import {ToastContainer, Slide} from 'react-toastify'

import '../styles/globals.css'

import {DEFAULT_SEO} from 'config'

export default function MyApp({
  Component,
  pageProps
}: AppProps): React.ReactElement {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="data-layer">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>

      <ThemeProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Slide}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
