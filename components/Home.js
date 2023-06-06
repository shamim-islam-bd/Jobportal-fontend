import Link from "next/link";
import JobItem from "./job/JobItem";
import Filters from "./layout/Filters";

export default function Home() {
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
                <a className="btn btn-secondary float-right stats_btn">
                  Get Topic stats
                </a>
              </Link>
              <div className="d-block">
                <Link href="/search" passHref>
                  <a>Go to Search</a>
                </Link>
              </div>
            </div>
            <JobItem />
            <JobItem />
          </div>
        </div>
      </div>
    </>
  );
}
