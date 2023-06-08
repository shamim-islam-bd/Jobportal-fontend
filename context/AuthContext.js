import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { errorToast } from "./Toast";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (user) => {
    try {
        setLoading(true);
        const res = await axios.post(`/api/auth/login`, {user})
        const data = await res.json()
        console.log(res);
        
        if (res.ok) {
            setUser(data.user);
            setSuccess(data.message);
            setIsAuthenticated(true);
            setLoading(false);
            router.push("/");
        }

    } catch (error) {
        setLoading(false);
        errorToast(error.message)
    }
  }


  return (
    <AuthContext.Provider
      value={{ user, errors, success, loading, isAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
