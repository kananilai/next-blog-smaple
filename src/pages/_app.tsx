import React from "react";
import { AppProps } from "next/app";
import "src/styles/globals.css";
import Link from "next/link";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="mx-auto max-w-prose">
      <header className="border-b border-gray-300 py-8">
        <h1>
          <Link href="/">
            <a className="text-5xl font-bold">Next js Blog</a>
          </Link>
        </h1>
      </header>
      <main className="mt-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default MyApp;
