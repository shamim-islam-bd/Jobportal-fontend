import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { loading, user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="dropdown ml-3">
              <span
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>{" "}
              </span>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/employeer/jobs" className="dropdown-item">
                My Jobs
                </Link>

                <Link href="/me/applied" className="dropdown-item">
                 Jobs Applied
                </Link>

                <Link href="/me" className="dropdown-item">
                  Profile
                </Link>

                <Link href="/upload/resume" className="dropdown-item">
                  Upload Resume
                </Link>

                <Link
                  onClick={logoutHandler}
                  href="/"
                  className="dropdown-item text-danger"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
