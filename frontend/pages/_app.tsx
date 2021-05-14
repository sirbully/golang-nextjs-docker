import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import "../styles/globals.scss"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
    <Component {...pageProps} />
    {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
  </QueryClientProvider>
)

export default MyApp
