import api from "../api/axios";

export const login = (data) =>
  api.post("/auth/login", data);

export const signup = (data) =>
  api.post("/auth/register", data);

export const logout = () =>
  api.post("/auth/logout");

export const getMe = () =>
  api.get("/auth/me");

export const googleLogin = () => {
  window.location.assign(
    `${import.meta.env.VITE_API_URL}/auth/google`
  );
};