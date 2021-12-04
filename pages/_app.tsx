import {CacheProvider, EmotionCache} from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'
import {DefaultSeo} from 'next-seo'
import {AppProps} from 'next/app'
import Script from 'next/script'
import {ToastContainer, Slide} from 'react-toastify'

import {DEFAULT_SEO} from 'config'
import theme from 'theme'
import {createEmotionCache} from 'utils/create-emotion-cache'

import 'styles/index.css'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): React.ReactElement {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

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
      <DefaultSeo {...DEFAULT_SEO} />

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
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
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
