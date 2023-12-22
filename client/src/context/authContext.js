import { createContext, useState, useContext } from "react";
import { register, login, verifyTokenRequest } from "../api/auth";
import { useEffect } from "react";
import cookies from "js-cookie";
import Cookies from "js-cookie";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userLog, setUserLog] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await register(user);
      setUserLog(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const singin = async (user) => {
    try {
      const res = await login(user);
      console.log(res.data);
      setUserLog(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async () => {
    Cookies.remove("token");
    setUserLog(null);
    setIsAuthenticated(false);
  };
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUserLog(null);
        setLoading(false);
        return;
      }
      try {
        console.log(cookies.token);
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUserLog(res.data);
        setLoading(false);
      } catch (err) {
        setIsAuthenticated(false);
        setUserLog(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        userLog,
        isAuthenticated,
        errors,
        singin,
        loading,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
