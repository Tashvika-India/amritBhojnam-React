import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NTQ1NjE5LCJpYXQiOjE3MjczMjk2MTksImp0aSI6ImU3ZWUzMGU3YWMzYTRhMzI5NzVhMzliYmUzZmY1Mjc0IiwidXNlcl9pZCI6ImYzNTAxY2FhLWZkYjgtNGNiNy1iNzhlLTgzZGFiMmM2OWI0NSJ9.kUkMtcONOt_NnvgeJ-z93bdZIMv7vz5CkwmiT_3FEEg";

const API = axios.create({
  baseURL: apiurl,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getCategoriesApi = () => API.get(`/categories/`);
export const postCategoriesApi = (payload) => API.post(`/categories/`, payload);

// product api  

export const postProductApi = (payload) => API.post(`/products/`, payload);



