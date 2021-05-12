import Head from "next/head"

import "tailwindcss/tailwind.css"

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default MyApp
