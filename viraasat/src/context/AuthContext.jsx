import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  useEffect(() => {
    const checkAuth = async () => {
    try {
      const user = await authService.getMe();
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  };

  checkAuth();

},[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () =>
  useContext(AuthContext);