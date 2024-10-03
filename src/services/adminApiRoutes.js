import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MTY4Njg2LCJpYXQiOjE3Mjc5NTI2ODYsImp0aSI6ImRmOWJlMGEzOTljMzQ3YWVhODlmNTg2YWRiNzFhMTRkIiwidXNlcl9pZCI6ImQ1MTFmMjIyLWQ3MzQtNDg3NC04OTlkLTYyMWRmOTBjMWRiMiIsImlzX2FkbWluIjp0cnVlfQ.QTB-tkVh60mHF5G66RMawAnBQj0TUYFTib8kICH3wsA";

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

// banner api
export const getBannerApi = () => API.get(`/banners/`);
export const postBannerApi = (payload) => API.post(`/banners/`, payload);
export const putBannerApi = (id, payload) => API.put(`/banners/${id}/`, payload);
export const deleteBannerApi = (id) => API.delete(`/banners/${id}`);


