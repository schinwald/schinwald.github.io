import '@styles/globals.scss'
import '@styles/icons.scss'
import '@styles/shadows.scss'
import { ThemeProvider } from 'hooks/context'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js" />
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollTrigger.min.js" />
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollToPlugin.min.js" /> */}
    <ThemeProvider theme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}

export default MyApp