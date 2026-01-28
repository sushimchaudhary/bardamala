import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://api.edifynepal.com";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isPublicRoute = originalRequest.url.includes("company-details");

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isPublicRoute) return Promise.reject(error);

      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${baseURL}/api/auth/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        
        Cookies.set("accessToken", newAccessToken, { expires: 30, path: '/' });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken", { path: '/' });
        Cookies.remove("refreshToken", { path: '/' });

        if (window.location.pathname.startsWith("/dashboard")) {
          window.dispatchEvent(new Event("unauthorized-access"));
          setTimeout(() => {
            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
          }, 1000);
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;