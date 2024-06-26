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
import AddBankModal from "@/components/banks/addBankModal";
import { AddBankModalContextProvider } from "@/components/banks/addBankModalContext";
import { AlertModalContextProvider } from "@/components/alert/alertModalContext";
import { RegisterModalContextProvider } from "@/components/auth/register/registerModalContext";
import RegisterModal from "@/components/auth/register/registerModal";
import AlertModal from "@/components/alert/alertModal";

const font = VT323({ subsets: ["latin"], weight: "400" });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web5ContextProvider>
        <AlertModalContextProvider>
          <AddPasswordModalContextProvider>
            <AddCardModalContextProvidet>
              <AddBankModalContextProvider>
                <RegisterModalContextProvider>
                  <main className={font.className}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen />
                    <AddPasswordModal />
                    <AlertModal />
                    <AddCardModal />
                    <AddBankModal />
                    <RegisterModal />
                  </main>
                </RegisterModalContextProvider>
              </AddBankModalContextProvider>
            </AddCardModalContextProvidet>
          </AddPasswordModalContextProvider>
        </AlertModalContextProvider>
      </Web5ContextProvider>
    </QueryClientProvider>
  );
}
