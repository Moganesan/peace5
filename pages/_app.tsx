import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Web5ContextProvider } from "@/context/web5";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web5ContextProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen />
      </Web5ContextProvider>
    </QueryClientProvider>
  );
}
