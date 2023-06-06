import Head from "next/head";
import Script from "next/script";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ metadata, children }) {
  return (
    <div>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>

      <Script
        strategy="beforeInteractive"
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      ></Script>

      <Script
        src="https://kit.fontawesome.com/9edb65c86a.js"
        crossOrigin="anonymous"
      ></Script>

      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      ></Script>

      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
      ></Script>

    
      <Header />
      {children}
      <Footer />


    </div>
  );
}
