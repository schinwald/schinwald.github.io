import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
				{/* fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Condensed:wght@300;400;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Condensed:wght@300;400;700&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/v5-font-face.min.css" integrity="sha512-wVffp1z2cYYhxt8nhif5UsMu415VRqX2CkMeWg5lYyrcpFBLfoMQ6ngVSJG8BumKBl83wf2bMRDwVmTgfoDovQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/devicon/2.15.1/devicon.min.css" integrity="sha512-X2hbziex+UPQ+KdI4BWI+39jEDhf2Smc6bfFI/FTIzWnt7mbwZCUU4RWalnMfxtHCpISlexzmd2kvPFJCliiPA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        {/* libraries */}
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
			</Head>
      <body >
        <Main />
        <NextScript />
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollTrigger.min.js"></script>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollToPlugin.min.js"></script>
      </body>
    </Html>
  )
}