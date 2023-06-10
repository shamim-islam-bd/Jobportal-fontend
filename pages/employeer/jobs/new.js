import { isAuthenticatedUser } from "@/utils/isAuthenticatedUser";
import NewJob from "../../../components/job/NewJob";

export default function NewJobPage({ access_token }) {
  return <NewJob access_token={access_token} />;
}

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

  return {
    props: {
      access_token,
    },
  };
}
