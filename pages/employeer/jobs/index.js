import MyJobs from "@/components/job/MyJobs";
import { isAuthenticatedUser } from "@/utils/isAuthenticatedUser";
import axios from "axios";
export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access;
  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  // console.log("jobs: ", res);

  const jobs = res.data;
  return {
    props: {
      jobs,
      access_token,
    },
  };
}

export default function MyJobsPage({ jobs, access_token }) {
  return <MyJobs jobs={jobs} access_token={access_token} />;
}
