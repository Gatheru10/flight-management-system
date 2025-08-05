// src/axiosConfig.js
import axios from "axios";

// Use CRA-compatible env variable
const backendUrl = process.env.REACT_APP_BACKEND_URL;

if (!backendUrl) {
  console.warn("⚠️ REACT_APP_BACKEND_URL is undefined. Check your .env file.");
}

const instance = axios.create({
  baseURL: backendUrl || "http://localhost:5000", // fallback for local dev
});

// Attach token to each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
