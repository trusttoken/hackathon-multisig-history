import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DAppProvider } from "@usedapp/core";
import { getDAppConfig } from "pages/providers/usedapp";
import { SafeProvider } from "pages/providers/SafeProvider/provider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DAppProvider config={getDAppConfig()}>
        <SafeProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeProvider>
        </SafeProvider>
      </DAppProvider>
    </QueryClientProvider>
  );
}
