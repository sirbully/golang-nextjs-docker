import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import "../styles/globals.scss"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="A simple message board. Let out your feelings."
      />
      <meta name="og:type" content="article" />
      <meta name="og:title" content="message board." />
      <meta
        name="og:description"
        content="A simple message board. Let out your feelings."
      />
      <meta name="og:image" content="https://i.imgur.com/qyxrTSb.png" />
      <meta name="og:url" content="https://build-mercari.krizzabullecer.dev" />
      <meta name="og:site_name" content="message board." />
      <meta name="og:author" content="Krizza Bullecer" />
      <meta name="twitter:title" content="message board." />
      <meta
        name="twitter:description"
        content="A simple message board. Let out your feelings."
      />
      <meta name="twitter:site" content="@nytimes" />
      <meta name="twitter:creator" content="@sirbully" />
      <meta name="twitter:image" content="https://i.imgur.com/qyxrTSb.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="shortcut icon" href="/favicon.png" />
      <title>message board. | Build@Mercari</title>
    </Head>
    <Component {...pageProps} />
    {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
  </QueryClientProvider>
)

export default MyApp
