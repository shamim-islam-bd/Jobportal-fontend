import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { errorToast, successToast } from "./Toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Register here ...

  // Login here ...
  const login = async ({ username, password }) => {
    try {
        setLoading(true);
        const res = await axios.post(`/api/auth/login`, { username, password });
  
        if (res.status === 200) {
          const data = res.data;
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
    
    }

  // Logout here ...



  return (
    <AuthContext.Provider
      value={{ user, errors, success, loading, isAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
