import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { errorToast, successToast } from "./Toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    !user && loadUser();

    if (user) {
      setIsAuthenticated(true);
      setLoading(false);
    }
    if (errors) {
      errorToast(errors);
      setErrors(null);
    }
  }, [user]);

  // Register here ...
  const register = async ({ first_name, last_name, email, password }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.API_URL}/api/signup/`, {
        first_name,
        last_name,
        email,
        password,
      });
      console.log(res);
      if (res.status === 201) {
        successToast(res.data.message);
        setLoading(false);
        router.push("/login");
      } else {
        setLoading(false);
        errorToast(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error.response.data.message);
    }
  };

  // Login here ...
  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/auth/login`, { username, password });

      if (res.status === 200) {
        // loadUser();
        setIsAuthenticated(true);
        setLoading(false);
        successToast(data.message);
        router.push("/");
      } else {
        setLoading(false);
        errorToast("Invalid Credentials");
      }
    } catch (error) {
      setLoading(false);
      errorToast("Invalid Credentials");
    }
  };

  // Loggin user ...
  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/auth/user`);
      if (res.status === 200) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      errorToast(error.response.data.error);
    }
  };

  // Logout here ...
  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/auth/logout`);
      if (res.status === 200) {
        // cookie.remove("access");
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        successToast("Logout Successful");
        router.push("/login");
      } else {
        setLoading(false);
        errorToast("Logout Failed");
      }
    } catch (error) {
      setLoading(false);
      errorToast("Logout Failed");
    }
  };

  // Upload Resume ------ incomplete *****
  const uploadResumeFunc = async (formData, access_token) => {

    console.log("uploadResumeFunc: ",formData);

    try {
      setLoading(true);
      const res = await axios.put(
        `${process.env.API_URL}/api/upload/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(res);

      if (res.data.resume) {
        setLoading(false);
        setUploaded(true);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      errorToast(error?.response?.data?.message);
    }
  };

  // clear Errors
  const clearErrors = () => setErrors(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        success,
        loading,
        isAuthenticated,
        login,
        logout,
        loadUser,
        register,
        clearErrors,
        uploaded,
        setUploaded,
        uploadResumeFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
