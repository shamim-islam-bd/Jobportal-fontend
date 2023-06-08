import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { DefaultSeo } from 'next-seo';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SEOConfig from "./seo.config";


import { AuthProvider } from "@/context/AuthContext";


export default function App({ Component, pageProps }) {

  return (
    <AuthProvider>
      <Layout>
         <ToastContainer />
         <DefaultSeo {...SEOConfig} /> {/* Set default SEO configuration */}
         <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
