import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";

// Axios Instance
const API = axios.create({
  baseURL: apiurl,
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

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
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
export const getAdminCategoriesApi = (category_name) =>
  API.get(`/categories/?category_name=${category_name}`);
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
export const getProductApi = ({
  product_id,
  category_id,
  name,
  minPrice,
  maxPrice,
  rating,
}) =>
  API.get(
    `/products/?category_id=${category_id}&product_id=${product_id}&name=${name}&min_amount=${minPrice}&max_amount=${maxPrice}&rating=${rating}&page=1&page_size=100`
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
export const getFinalCartApi = (cart_id, coupon_code, coinStatus) =>
  API.get(
    `/cart/final/?cart_id=${cart_id}&coupon_code=${coupon_code}&apply_amrit_coins=${coinStatus}`
  );

// options api

export const getOptionsApi = () => API.get(`/products/options/`);
export const postOptionsApi = (payload) =>
  API.post(`/products/options/`, payload);
export const putOptionsApi = (id, payload) =>
  API.put(`/products/options/${id}`, payload);
export const patchOptionsApi = (id, payload) =>
  API.patch(`/products/options/${id}`, payload);
export const getPopularProducts = () => API.get("products/popular/");
export const getBestPriceApi = () => API.get("best-price-products/");

// checkout & address api

export const postSelectAddressApi = (payload) =>
  API.post(`/accounts/address/select/`, payload);
export const getAddressApi = () => API.get(`/accounts/addresses/`);
export const postAddressApi = (payload) =>
  API.post(`/accounts/addresses/`, payload);
export const putAddressApi = (id, payload) =>
  API.put(`/accounts/address/${id}`, payload);
export const deleteAddressApi = (id) => API.delete(`/accounts/address/${id}`);
``;

export const getPincodeApi = (pincode) =>
  API.get(`/pincode/?pincode=${pincode}`);

// Wishlist api
export const getWishlist = () => API.get(`/wishlist/`);
export const postWishlist = (payload) => API.post(`/wishlist/`, payload);

//profile api
export const getProfile = () => API.get(`/profiles/`);
export const getProfileApi = (id) => API.get(`/profiles/${id}/`);
export const postProfileApi = (payload) => API.post(`/profiles/`, payload);
export const putProfileApi = (id, payload) =>
  API.put(`/profiles/${id}/`, payload);
export const patchProfileApi = (id, payload) =>
  API.patch(`/profiles/${id}/`, payload);

// pay now
export const postPayNowApi = (payload) =>
  API.post(`/accounts/payu/initiate/`, payload);
export const postPayuCallbackApi = (url, payload) => API.post(url, payload);

//order history
export const getOrderApi = (page = 1, page_size = 3, days) =>
  API.get(`/orders/?page=${page}&page_size=${page_size}&days=${days}`);
export const getOrderAdminApi = (id, name) =>
  API.get(`/orders/?order_id=${id}&product_name=${name}`);
export const getOrderSuccessAdminApi = (id, name) =>
  API.get(`/orders_by_success/?order_id=${id}&product_name=${name}`);

// re order

export const reOrderApi = (id) => API.post(`/re_orders/?order_id=${id}`);

//order success
export const getOrderSuccessApi = (payload) =>
  API.post(`/accounts/accept_order/`, payload);
export const postOrderDispatchApi = (payload) =>
  API.post(`/accounts/ready_to_dispatch/`, payload);

//track order
export const trackOrderApi = (id) =>
  API.get(`/order_tracking_status/?order_id=${id}`);

// Contact api
export const getContactApi = () => API.get(`/contact/`);
export const postContactApi = (payload) => API.post(`/contact/`, payload);

//coupon

export const getCouponApi = (code = "") =>
  API.get(`/coupons/?coupon_code=${code}`);
export const postCouponApi = (payload) => API.post(`/coupons/`, payload);
export const putCouponApi = (id, payload) => API.put(`/coupons/${id}`, payload);
export const deleteCouponApi = (id) => API.delete(`/coupons/${id}`);

//rating

export const getRatingApi = (product_id) =>
  API.get(`/product/rating/?product_id=${product_id}`);
export const postRatingApi = (payload) => API.post(`/product/rating/`, payload);

// order
export const getAdminOrderApi = () => API.get(`/orders/`);

export const getAdminOrderListApi = (
  id,
  orderStartDate,
  orderEndDate,
  page = 1,
  page_size = 1000
) => {
  return API.get(
    `/orders/?display_order_id=${id}&page=${page}&page_size=${page_size}&start_date=${orderStartDate}&end_date=${orderEndDate}`
  );
};
export const downloadInvoiceApi =(id)=>API.get(`download_invoice_pdf?order_id=${id}`)

//nutrition
export const getNutritionApi = () => API.get(`/nutritions/`);
export const postNutritionApi = (payload) => API.post(`/nutritions/`, payload);
export const putNutritionApi = (payload) =>
  API.put(`/nutrition/${payload.nutrition_id}/`, payload);
export const deleteNutritionApi = (id) => API.delete(`/nutrition/${id}`);

//nutriton-value
export const getNutritionValueApi = () => API.get(`/product-nutritions/`);
export const postNutritionValueApi = (payload) =>
  API.post(`/product-nutritions/`, payload);

export const multiImageUploadApi = (payload) =>
  API.post(`/multi_img_upload/`, payload);
export const singleImageUploadApi = (payload) =>
  API.post(`/single_img_upload/`, payload);

// check pincode

export const checkPincodeApi = (pincode, weight, weight_unit) =>
  API.get(
    `accounts/check_availability_by_pincode/?pincode=${pincode}&weight=${weight}&weight_unit=${weight_unit}`
  );

// invoice
export const getOrderInvoiceApi = (id) =>
  API.post(`/accounts/invoice_download_by_shiprocket/`, id);

//Dashboard
// export const getDashboardApi = () => API.get(`/accounts/dashboard/`);
export const getDashboardApi = (params = {}) =>
  API.get("/accounts/dashboard/", { params });

// Aad meal api
export const getMealApi = () => API.get(`/meal_items/`);
export const postAddMealApi = (payload) => API.post(`/meal_items/`, payload);
export const putMealApi = (id, payload) =>
  API.put(`/meal_items/${id}/`, payload);
export const deleteMealApi = (id) => API.delete(`/meal_items/${id}`);

// Aad meal api
export const getMealHealthIssueApi = () => API.get(`/meal_health_issue/`);
export const postMealHealthIssue = (payload) =>
  API.post(`/meal_health_issue/`, payload);
export const deleteMealHealthIssue = (id) =>
  API.delete(`/meal_health_issue/${id}`);

export const getMealFoodSensitivityApi = () =>
  API.get(`/meal_food_sensitivity/`);
export const postMealFoodSensitivity = (payload) =>
  API.post(`/meal_food_sensitivity/`, payload);
export const putMealFoodSensitivity = (id, payload) =>
  API.put(`/meal_food_sensitivity/${id}/`, payload);
export const deleteFoodSensitivity = (id) =>
  API.delete(`/meal_food_sensitivity/${id}`);

// amrit coin

export const getAmritCoinApi = () => API.get(`/coin_management/`);
export const postAmritCoinApi = (payload) =>
  API.post(`/coin_management/`, payload);

export const getAmritCoinHistoryApi = () => API.get(`/amrit_coins_history/`);
// notification
export const getNotificationApi =(page=1,page_size=10)=>API.get(`/notification_history?page=${page}&page_size=${page_size}/`);
