import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { DefaultSeo } from 'next-seo';
import SEOConfig from "./seo.config";


export default function App({ Component, pageProps }) {

  return (
    <Layout>
        <DefaultSeo {...SEOConfig} /> {/* Set default SEO configuration */}
        <Component {...pageProps} />
    </Layout>
  );
}
