import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);