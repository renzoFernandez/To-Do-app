import axios from "./axios";

export const register = async (user) => {
  return await axios.post("/api/register", user);
};

export const login = async (user) => {
  return await axios.post("/api/login", user);
};

export const verifyTokenRequest = () => axios.get("api/verify");
