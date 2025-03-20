import axios from "axios";

// const apiurl = process.env.REACT_APP_DEV_API_KEY_NEW;
const apiurl = import.meta.env.VITE_BASE_API_URL;
const API = axios.create({
  baseURL: apiurl+"/api",
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = "Basic dXNlcjpheXVzaA==";
  req.headers["Content-Type"] = "application/json";
  return req;
});

export const adminLoginApi = (data) => API.post(`accounts/admin/login/`, data);

// send otp api
export const sendOtpApi = (data) => API.post(`accounts/send_otp/`, data); 
export const verifyOtpApi = (data) => API.post(`accounts/verify_otp/`, data);