import "@/styles/globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MovieGuesser | Guess Movies from Bad Descriptions</title>
        <meta
          name="description"
          content="Guess movies based on hilarious bad descriptions, discover new movies, and track your high scores!"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
