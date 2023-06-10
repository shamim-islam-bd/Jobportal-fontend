import JobCandidates from "@/components/job/JobCandidates";
import NotFound from "@/components/layout/NotFound";
import { isAuthenticatedUser } from "@/utils/isAuthenticatedUser";
import axios from "axios";


export async function getServerSideProps({ req, params }) {
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

  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/jobs/${params.id}/candidates/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const candidatesApplied = res.data;

    return {
      props: {
        candidatesApplied,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}


export default function JobCandidatesPage({ candidatesApplied, error }) {
  if (error?.includes("Not found")) return <NotFound />;

  return <JobCandidates candidatesApplied={candidatesApplied} />;
}
