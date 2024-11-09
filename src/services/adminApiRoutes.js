import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";
 
const API = axios.create({
  baseURL: apiurl,
});

// Refresh token function
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${apiurl}/accounts/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};

// Add interceptor to handle expired tokens
API.interceptors.response.use(
  (response) => response, // Pass through if the response is successful
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Try refreshing the token if we get a 401 error
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Retry the original request with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } else {
        // Logout or handle the error if token refresh fails
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; // Redirect to login or handle as necessary
      }
    }
    return Promise.reject(error);
  }
);

// Set up request interceptor to attach the access token
API.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});




export const getCategoriesApi = () => API.get(`/categories/`);
export const postCategoriesApi = (payload) => API.post(`/categories/`, payload);
export const putCategoriesApi = (id, payload) => API.put(`/categories/${id}/`, payload); 
export const patchCategoriesApi = (id, payload) => API.patch(`/categories/${id}/`, payload);

export const getSubCategoriesApi = () => API.get(`/sub-categories/`);
export const postSubCategoriesApi = (payload) => API.post(`/sub-categories/`, payload);
export const putSubCategoriesApi = (id, payload) => API.put(`/sub-categories/${id}/`, payload); 
export const patchSubCategoriesApi = (id, payload) => API.patch(`/sub-categories/${id}/`, payload);

// product api  
export const getProductApi = (product_id) => API.get(`/products/?product_id=${product_id ? product_id : ""}`);
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

