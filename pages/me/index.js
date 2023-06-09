import UpdateProfile from "@/components/user/UpdateProfile";
import { isAuthenticatedUser } from "@/utils/isAuthenticatedUser";

export async function getServerSideProps(context) {
  const { req } = context;
  const access_token = req.cookies.access;

  const user = await isAuthenticatedUser(access_token);
  console.log(user);

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

export default function IndexPage({ access_token }) {
  // console.log("IndexPage : ", access_token);

  return (
    <>
      <UpdateProfile access_token={access_token} />
    </>
  );
}
