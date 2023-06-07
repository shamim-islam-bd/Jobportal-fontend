import React from "react";
import moment, { utc } from "moment";
import { NextSeo } from 'next-seo';

const JobDetails = ({ job }) => {
  const { title, company, description, address, education, createdAt, email, positon, jobType, lastDate, experience, industry, salary } = job.jobs;
  const { candidates } = job;
  
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
                    <button className="btn btn-primary px-4 py-2 apply-btn">
                      Apply Now
                    </button>
                    <span className="ml-4 text-success">
                      <b>{candidates} </b> candidates has applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>Description</h4>
                <p>
                 {description}
                </p>
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
              <h4 className="my-4">More Details</h4>
              <hr />
              <h5>Email Address:</h5>
              <p>{email}</p>

              <h5>Job Posted:</h5>
              <p>{moment.utc(createdAt).local().startOf('seconds').fromNow()}</p>

              <h5>Last Date:</h5>
              <p>{moment.utc(lastDate).local().startOf('seconds').fromNow()}</p>
            </div>

            <div className="mt-5 p-0">
              <div className="alert alert-danger">
                <h5>Note:</h5>
                You can no longer apply to this job. This job is expired. Last
                date to apply for this job was: <b>{lastDate}</b>
                <br /> Checkout others job on Jobbee.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


export default JobDetails;