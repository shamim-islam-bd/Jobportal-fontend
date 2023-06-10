import JobContext from "@/context/JobContext";
import { errorToast } from "@/context/Toast";
import moment from "moment";
import { NextSeo } from "next-seo";
import { useContext, useEffect } from "react";

const JobDetails = ({ job, access_token }) => {
  const {
    title,
    company,
    description,
    address,
    education,
    createdAt,
    email,
    positon,
    jobType,
    lastDate,
    experience,
    industry,
    salary,
  } = job;

  const { candidates } = job;

  const { applyToJob, checkJobApplied, applied, clearErrors, loading, error } =
    useContext(JobContext);

  useEffect(() => {
    if (error) {
      console.log(error.message);
      errorToast(error);
      clearErrors();
    }

    checkJobApplied(job.id, access_token); // check if user has applied to this job
  }, [error]);

  const handleApplyToJob = () => {
    applyToJob(job.id, access_token);
  };

  const d1 = moment(lastDate);
  const d2 = moment(Date.now());
  const daysLeft = d1.diff(d2, "days") < 0 ? true : false;

  return (
    <>
      <NextSeo title={`${title}`} description={`${description}`} />

      <div className="job-details-wrapper">
        <div className="container container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="job-details p-3">
                <div className="job-header p-4">
                  <h2>{title}</h2>
                  <span>
                    <i aria-hidden className="fas fa-building"></i>
                    <span> {company}</span>
                  </span>
                  <span className="ml-4">
                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                    <span> {address}</span>
                  </span>

                  <div className="mt-3">
                    <span>
                      {loading ? (
                        "Loading..."
                      ) : applied ? (
                        <button
                          disabled
                          className="btn btn-success px-4 py-2 apply-btn"
                        >
                          <i aria-hidden className="fas fa-check"></i>
                          {loading ? "Applying..." : "Applied"}
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyToJob}
                          disabled={daysLeft}
                          className="btn btn-primary px-4 py-2 apply-btn"
                        >
                          {loading ? "Applying..." : "Apply Now"}
                        </button>
                      )}
                      <span className="ml-4 text-success">
                        <b>{candidates} </b> candidates has applied to this job.
                      </span>
                    </span>
                  </div>
                </div>

                <div className="job-description mt-5">
                  <h4>Description</h4>
                  <p>{description}</p>
                </div>

                <div className="job-summary">
                  <h4 className="mt-5 mb-4">Job Summary</h4>
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <td>Job Type</td>
                        <td>:</td>
                        <td>{jobType}</td>
                      </tr>

                      <tr>
                        <td>Job Industry</td>
                        <td>:</td>
                        <td>{industry}</td>
                      </tr>

                      <tr>
                        <td>Expected Salary</td>
                        <td>:</td>
                        <td>${salary}</td>
                      </tr>

                      <tr>
                        <td>Education</td>
                        <td>:</td>
                        <td>{education}</td>
                      </tr>

                      <tr>
                        <td>Experience</td>
                        <td>:</td>
                        <td>{experience}</td>
                      </tr>

                      <tr>
                        <td>Company</td>
                        <td>:</td>
                        <td>{company}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="job-location">
                  <h4 className="mt-5 mb-4">Job Location</h4>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4">
              <div className="job-contact-details p-3">
                <h4 className="my-4 font-semibold text-[20px]">More Details</h4>
                <hr />
                <h5 className="mt-3 font-semibold">Email Address:</h5>
                <p className="font-semibold my-1">{email}</p>

                <h5 className="my-1 font-semibold">Job Posted:</h5>
                <p className="font-semibold my-1">
                  {moment.utc(createdAt).local().startOf("seconds").fromNow()}
                </p>

                <h5 className="my-1 font-semibold">Last Date:</h5>
                <p className="font-semibold my-1">
                  {moment(lastDate).format("YYYY-MM-D")}
                </p>
              </div>

              <div className="mt-5 p-0">
                {daysLeft && (
                  <div className="alert alert-danger">
                    <h5>Note:</h5>
                    You can no longer apply to this job. This job is expired.
                    Last date to apply for this job was:{" "}
                    <b>{moment(lastDate).format("YYYY-MM-D")}</b>
                    <br /> Checkout others job on Jobbee.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
