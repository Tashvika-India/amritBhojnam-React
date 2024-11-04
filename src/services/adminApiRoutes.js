import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwOTE3OTQ1LCJpYXQiOjE3MzA3MDE5NDUsImp0aSI6IjgzNWU1Y2RiNDkxYjQ1ZmVhMGUxNDg4ZThkYTgzMTAwIiwidXNlcl9pZCI6ImM0Y2Q1MzI0LTkyMTAtNGU5ZS1iNzFiLWJlNDY2NzBkYTIyMyIsImlzX2FkbWluIjp0cnVlfQ.Oc74IxRWdCJQSDR1XWrZCq_VfNk4ERQu0NGmlnyXPtQ";

const API = axios.create({
  baseURL: apiurl,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getCategoriesApi = () => API.get(`/categories/`);
export const postCategoriesApi = (payload) => API.post(`/categories/`, payload);
export const putCategoriesApi = (id, payload) => API.put(`/categories/${id}/`, payload); 
export const patchCategoriesApi = (id, payload) => API.patch(`/categories/${id}/`, payload);

// product api  
export const getProductApi = () => API.get(`/products/`);
export const postProductApi = (payload) => API.post(`/products/`, payload);
export const putProductApi = (id, payload) => API.put(`/products/${id}/`, payload);
export const deleteProductApi = (id) => API.delete(`/products/${id}`);
export const searchProductApi = (search) => API.get(`/products/similar-to-search/?search_query=${search}`);

// banner api
export const getBannerApi = () => API.get(`/banners/`);
export const postBannerApi = (payload) => API.post(`/banners/`, payload);
export const putBannerApi = (id, payload) => API.put(`/banners/${id}/`, payload);
export const patchBannerApi = (id, payload) => API.patch(`/banners/${id}/`, payload);
export const deleteBannerApi = (id) => API.delete(`/banners/${id}`);


