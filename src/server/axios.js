import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8080",
  baseURL: "https://api-sih23-coal-transportation.onrender.com",
  headers: {
    "content-type": "application/json",
  },
  responseType: "json",
});

export default axiosInstance;
