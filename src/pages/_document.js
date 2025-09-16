import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <link rel="icon" href="favicon.svg" />
      <title>MovieGuesser | Guess Movies from Bad Descriptions</title>
      <meta
        name="title"
        content="MovieGuesser 🎬 | Guess Movies from Bad Descriptions"
      ></meta>
      <meta
        name="description"
        content="Guess movies based on hilarious bad descriptions, discover new movies, and track your high scores!"
      ></meta>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
