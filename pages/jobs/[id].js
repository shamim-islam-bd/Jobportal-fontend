import JobDetails from "@/components/job/JobDetails";
import Loader from "@/components/layout/Loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NotFoundPage from "../404";

async function getJobData(jobId) {
  const res = await fetch(`${process.env.API_URL}/jobs/${jobId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch job data");
  }
  return res.json();
}

export default function JobDetailsPage() {
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchJobData = async () => {
          try {
            const jobData = await getJobData(id);
            setJob(jobData);
          } catch (error) {
            setError(error);
          }
        };
    
        if (id) {
          fetchJobData();
        }
      }, [id]);

  return (
    <div>
      {!job ? <NotFoundPage /> : job ? <JobDetails job={job} /> : <Loader />}
    </div>
  );
}
