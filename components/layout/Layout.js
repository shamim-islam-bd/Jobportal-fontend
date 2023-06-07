import Head from "next/head";
import Script from "next/script";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ pageProps, children }) {

  return (
    <div>
      {/* <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content={pageProps.description} />
      </Head> */}

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
