import "@/styles/globals.css";
import { Source_Code_Pro } from "next/font/google";
import type { AppProps } from "next/app";

const sourceCodePro = Source_Code_Pro({
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={sourceCodePro.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
