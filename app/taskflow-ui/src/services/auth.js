import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const signup = (user) => API.post("/auth/signup", user);
export const login = (user) => API.post("/auth/login", user);