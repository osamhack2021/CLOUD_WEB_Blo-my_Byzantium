import axios from "axios";

// const api = axios.create({
//   baseURL: `${process.env.REACT_APP_BASE_URL}`,
//   headers: { "Content-Type": "text/plain" },
//   withCredentials: true,
// });

// temp for DEV
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: { "Content-Type": "text/plain" },
  withCredentials: true,
});

export default api;
