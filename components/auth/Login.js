import { AuthContext } from "@/context/AuthContext";
import { errorToast } from "@/context/Toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, errors, login, clearErrors, loadUser, loading } = useContext(AuthContext);

  
  useEffect(() => {
    if(errors) {
      errorToast(errors);
      clearErrors();
    }
    if (isAuthenticated) {
      router.push("/");
    }
    loadUser();
  }, [isAuthenticated, loading]);



  const handleLogin = (e) => {
    e.preventDefault();
    login({ username: email, password });
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              width={500}
              height={500}
              src="/images/login.svg"
              alt="login"
            />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> LOGIN</h2>
            </div>
            <form className="form" onSubmit={handleLogin}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton">
                  Login
                </button>
              </div>
              <p style={{ textDecoration: "none" }} className="signup">
                New to Jobbee? <Link href="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
