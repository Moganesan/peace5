import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Web5ContextProvider } from "@/context/web5";
import { AddPasswordModalContextProvider } from "@/components/addPassword/addPasswordModalContext";
import { VT323 } from "next/font/google";
import AddPasswordModal from "@/components/addPassword/addPasswordModal";
import AddCardModal from "@/components/addCard/addCardModal";
import { AddCardModalContextProvidet } from "@/components/addCard/addCardModalContext";

const font = VT323({ subsets: ["latin"], weight: "400" });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web5ContextProvider>
        <AddPasswordModalContextProvider>
          <AddCardModalContextProvidet>
            <main className={font.className}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen />
              <AddPasswordModal />
              <AddCardModal />
            </main>
          </AddCardModalContextProvidet>
        </AddPasswordModalContextProvider>
      </Web5ContextProvider>
    </QueryClientProvider>
  );
}
