import { useContext, useEffect } from "react";

import JobContext from "@/context/JobContext";
import { errorToast } from "@/context/Toast";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";

const MyJobs = ({ jobs, access_token }) => {
  const { clearErrors, error, loading, deleted, deleteJob, setDeleted } =
    useContext(JobContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      errorToast(error);
      clearErrors();
    }

    if (deleted) {
      setDeleted(false);
      router.push(router.asPath);
    }
  }, [error, deleted]);

  const deleteJobHandler = (id) => {
    deleteJob(id, access_token);
  };

  const columns = [
    {
      name: "Job ID",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Job name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Salary",
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  const data = [];

  jobs &&
    jobs.forEach((job) => {
      data.push({
        id: job.id,
        title: job.title,
        salary: job.salary,
        action: (
          <>
            <Link href={`/jobs/${job.id}`} className="btn btn-primary">
              <i aria-hidden className="fa fa-eye"></i>
            </Link>
            <Link
              href={`/employeer/jobs/candidates/${job.id}`}
              className="btn btn-success my-2 mx-1"
            >
              <i aria-hidden className="fa fa-users"></i>
            </Link>
            <Link
              href={`/employeer/jobs/${job.id}`}
              className="btn btn-warning my-2 mx-1"
            >
              <i aria-hidden className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger mx-1"
              onClick={() => deleteJobHandler(job.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5 text-2xl font-bold">My Jobs</h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default MyJobs;
