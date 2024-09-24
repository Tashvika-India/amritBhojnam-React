import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL + "/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3Mjg2Mjc3LCJpYXQiOjE3MjcwNzAyNzcsImp0aSI6IjE5YzM3NzkwYjUxNzQwYTdhYjQ0OWNjMTJlNDFlZTE5IiwidXNlcl9pZCI6IjgwY2QxZjE2LTkzYTEtNDMyNi1iOWExLTAwOTdjZmE2YmU2NCJ9.QBFbcDNst64U6oPwsrDIju1oSYqrkmz8H0Nbu3_URr4";

const API = axios.create({
  baseURL: apiurl,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getCategoriesApi = () => API.get(`/categories/`);
export const postCategoriesApi = (payload) => API.post(`/categories/`, payload);
