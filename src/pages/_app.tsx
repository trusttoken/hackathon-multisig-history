import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DAppProvider} from "@usedapp/core";
import {getDAppConfig} from "@/pages/providers/usedapp";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <DAppProvider config={getDAppConfig()}>
      <Component {...pageProps} />
    </DAppProvider>
  </QueryClientProvider>
}
