import '@styles/globals.scss'
import '@styles/icons.scss'
import '@styles/shadows.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp