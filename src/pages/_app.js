import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";

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

      <Script
        id="va-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
          `,
        }}
      />

      <Script
        async
        src="/mt-demo/script.js"
        data-endpoint="/mt-demo"
        strategy="afterInteractive"
      />

      <Component {...pageProps} />
    </>
  );
}
