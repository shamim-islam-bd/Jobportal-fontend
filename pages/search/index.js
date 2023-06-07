import Search from "@/components/layout/Search";
import { NextSeo } from "next-seo";

export default function SearchPage() {
  return (
    <>
      <NextSeo title="Search jobs" description="Search your desire jobs here" />
      <Search />
    </>
  );
}
