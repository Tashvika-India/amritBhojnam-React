import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";

const getToken = localStorage.getItem("access")
  ? localStorage.getItem("access")
  : localStorage.getItem("refresh");

const API = axios.create({
  baseURL: apiurl,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${getToken}`;
  return req;
});

export const getCategoriesApi = () => API.get(`/categories/`);
export const postCategoriesApi = (payload) => API.post(`/categories/`, payload);
export const putCategoriesApi = (id, payload) => API.put(`/categories/${id}/`, payload); 
export const patchCategoriesApi = (id, payload) => API.patch(`/categories/${id}/`, payload);

export const getSubCategoriesApi = () => API.get(`/sub-categories/`);

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


