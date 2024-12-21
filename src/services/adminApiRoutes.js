import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";

// Axios Instance
const API = axios.create({
  baseURL: apiurl
});
// Token Refresh Logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject(error);
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await API.post("/accounts/token/refresh/", {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error.message);
    throw error;
  }
};

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        // window.location.href = "/admin/login"; // Redirect to login page
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export const getCategoriesApi = () => API.get(`/categories/`);
export const postCategoriesApi = (payload) => API.post(`/categories/`, payload);
export const putCategoriesApi = (id, payload) =>
  API.put(`/categories/${id}/`, payload);
export const patchCategoriesApi = (id, payload) =>
  API.patch(`/categories/${id}/`, payload);

export const getSubCategoriesApi = () => API.get(`/sub-categories/`);
export const postSubCategoriesApi = (payload) =>
  API.post(`/sub-categories/`, payload);
export const putSubCategoriesApi = (id, payload) =>
  API.put(`/sub-categories/${id}/`, payload);
export const patchSubCategoriesApi = (id, payload) =>
  API.patch(`/sub-categories/${id}/`, payload);

// product api
export const getProductApi = ({ product_id, category_id, name , minPrice , maxPrice , rating }) =>
  API.get(
    `/products/?category_id=${category_id}&product_id=${product_id}&name=${name}&min_amount=${minPrice}&max_amount=${maxPrice}&rating=${rating}`
  );
export const postProductApi = (payload) => API.post(`/products/`, payload);
export const putProductApi = (id, payload) =>
  API.put(`/products/${id}/`, payload);
export const deleteProductApi = (id) => API.delete(`/products/${id}`);
export const searchProductApi = (search) =>
  API.get(`/products/similar-to-search/?search_query=${search}`);

export const getYouMayAlsoLikeApi = ({ product_id }) =>
  API.get(`/products/you-may-also-like/?product_id=${product_id}`);



// banner api
export const getBannerApi = () => API.get(`/banners/`);
export const postBannerApi = (payload) => API.post(`/banners/`, payload);
export const putBannerApi = (id, payload) =>
  API.put(`/banners/${id}/`, payload);
export const patchBannerApi = (id, payload) =>
  API.patch(`/banners/${id}/`, payload);
export const deleteBannerApi = (id) => API.delete(`/banners/${id}`);

// cart api

export const getCartApi = () => API.get(`/cart/`);
export const postCartApi = (payload) => API.post(`/cart/`, payload);
export const getFinalCartApi = (cart_id) =>
  API.get(`/cart/final/?cart_id=${cart_id}`);

// options api

export const getOptionsApi = () => API.get(`/products/options/`);
export const postOptionsApi = (payload) =>
  API.post(`/products/options/`, payload);
export const putOptionsApi = (id, payload) =>
  API.put(`/products/options/${id}`, payload);
export const patchOptionsApi = (id, payload) =>
  API.patch(`/products/options/${id}`, payload);
export const getPopularProducts = () => API.get("products/popular/");
export const getBestPriceApi = () => API.get("best-price-products/")

// checkout & address api

export const postSelectAddressApi = (payload) => API.post(`/accounts/address/select/`, payload);
export const getAddressApi = () => API.get(`/accounts/addresses/`);
export const postAddressApi = (payload) => API.post(`/accounts/addresses/`, payload);
export const putAddressApi = (id, payload) => API.put(`/accounts/address/${id}`, payload); 
export const deleteAddressApi = (id) => API.delete(`/accounts/address/${id}`);``

export const getPincodeApi = (pincode) => API.get(`/pincode/?pincode=${pincode}`);

// Wishlist api
export const getWishlist = () => API.get(`/wishlist/`);
export const postWishlist = (payload) => API.post(`/wishlist/`, payload);

//profile api
export const getProfile = () => API.get(`/profiles/`);
export const getProfileApi = (id) => API.get(`/profiles/${id}/`);
export const postProfileApi = (payload) => API.post(`/profiles/`, payload);
export const putProfileApi = (id,payload) => API.put(`/profiles/${id}/`, payload);

// pay now 
export const postPayNowApi = (payload) => API.post(`/accounts/payu/initiate/`, payload); 
export const postPayuCallbackApi = (url,payload) => API.post(url, payload); 

//order history
export const getOrderApi = () => API.get(`/orders/`); 

export const postContactApi = (payload) => API.post(`/contact/`, payload);

//coupon

export const getCouponApi = () => API.get(`/coupons/`);
export const postCouponApi = (payload) => API.post(`/coupons/`, payload);

//rating

export const getRatingApi = (product_id) => API.get(`/product/rating/?product_id=${product_id}`);
export const postRatingApi = (payload) => API.post(`/product/rating/`, payload);

// order
export const getAdminOrderApi = ( ) => API.get(`/orders/`);

//nutrition
export const getNutritionApi = () => API.get(`/nutritions/`);
export const postNutritionApi = (payload) => API.post(`/nutritions/`, payload); 


