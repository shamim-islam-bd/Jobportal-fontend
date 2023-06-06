import Link from "next/link";
import JobItem from "./job/JobItem";
import Filters from "./layout/Filters";

export default function Home({ data }) {

  const {jobs, count, resPerPage} = data;

  console.log("data Home", data);

  return (
    <>
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <Filters />
          </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
              <h4 className="page-title">"Latest Jobs"</h4>
              <Link href="/stats" passHref>
                <div className="btn btn-secondary float-right stats_btn">
                  Get Topic stats
                </div>
              </Link>
              <div className="d-block">
                <Link href="/search" passHref>
                 Go to Search
                </Link>
              </div>
            </div>
           {
            jobs && jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))
           }
          </div>
        </div>
      </div>
    </>
  );
}
