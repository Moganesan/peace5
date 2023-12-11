import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "../components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <main
        className={`flex bg-white-50 bg-dark min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        sdsd
      </main>
    </Layout>
  );
}
