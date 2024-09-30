import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3ODkxMzY1LCJpYXQiOjE3Mjc2NzUzNjUsImp0aSI6IjBmZmQxNTFkMmQzZjQyNjNhNTVhZDk0NTA0ZWNjMTQ2IiwidXNlcl9pZCI6ImQ1MTFmMjIyLWQ3MzQtNDg3NC04OTlkLTYyMWRmOTBjMWRiMiIsImlzX2FkbWluIjp0cnVlfQ.xarv8x-yo26whGA1QtigGtTtg8fgbdzXrm_6Sbn1j0o";

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
export const getProductApi = () => API.get(`/products/`);
export const postProductApi = (payload) => API.post(`/products/`, payload);
export const putProductApi = (id, payload) => API.put(`/products/${id}/`, payload);
export const deleteProductApi = (id) => API.delete(`/products/${id}`);



