import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import JobItem from "./job/JobItem";
import Filters from "./layout/Filters";

export default function Home({ data }) {
  const router = useRouter();
  const {jobs, count, resPerPage} = data;

  // Pagination handler
  const { page = 1, keyword } = router.query;

  const handlePageChange = (currentPage) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;

    currentQuery.page = currentPage;
    
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };



  return (
    <>
      <NextSeo title="Jobs" description="all jobs" />

      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <Filters />
          </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
              <h4 className="page-title">
                {
                  keyword ? `Jobs for ${keyword}` :  "Latest Jobs"
                }
              </h4>
              <Link href="/stats">
                <div className="btn btn-secondary float-right stats_btn">
                  Get Topic stats
                </div>
              </Link>
              <div className="d-block">
                <Link href="/search">
                 Go to Search
                </Link>
              </div>
            </div>
           {
            jobs && jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))
           }
           {
            resPerPage < count && (
              <Pagination key={resPerPage} 
                activePage={page}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={handlePageChange}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            )
           }
          </div>
        </div>
      </div>
    </>
  );
}
