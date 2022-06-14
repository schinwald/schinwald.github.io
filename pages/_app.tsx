import '@styles/globals.scss'
import '@styles/icons.scss'
import '@styles/shadows.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js" />
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollTrigger.min.js" />
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollToPlugin.min.js" /> */}
    <Component {...pageProps} />
  </>
}

export default MyApp