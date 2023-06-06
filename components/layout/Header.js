import Link from "next/link";

const Header = () => {
  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoImgWrapper">
            <img width="30" height="30" src="/images/logo.png" alt="" />
          </div>
          <span className="logo1">Job</span>
          <span className="logo2">bee</span>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>

          <Link href="/login">
            <button className="loginButtonHeader">
              <span>Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
