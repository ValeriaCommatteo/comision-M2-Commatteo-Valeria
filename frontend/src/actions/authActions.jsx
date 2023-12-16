import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verify } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const authenticateUser = async (authFunction, userData) => {
    try {
      const res = await authFunction(userData);
      setUser(res.data);
      setIsAuthenticated(true);
      Cookies.set("token", res.data.message);
    } catch (error) {
      console.error(error);
      setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message]);
    }
    setLoading(false);
  };

  const signup = (user) => authenticateUser(registerRequest, user);
  const signin = (user) => authenticateUser(loginRequest, user);

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (cookies.token) {
        try {
          const res = await verify(cookies.token);
          if (res.data) {
            setIsAuthenticated(true);
            setUser(res.data);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ signup, signin, logout, user, isAuthenticated, errors, loading }} >
      {children}
    </AuthContext.Provider>
  );
};
