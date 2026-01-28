import axios from "axios"; // Direct axios use garne login ko lagi
import Cookies from "js-cookie";

const baseURL = "https://api.edifynepal.com";

export const loginUser = async (credentials: any) => {
  try {
    // Interceptor navayeko direct axios call
    const res = await axios.post(`${baseURL}/api/auth/login/`, credentials);
    const { access, refresh } = res.data;

    // Cookie set garda 'path' thapne
    // Access Token: Backend ko expiry sanga match gara (e.g., 1 day)
    Cookies.set("accessToken", access, { 
        expires: 30, 
        path: '/',
        secure: true, // HTTPS ma xau vane
        sameSite: 'strict'
    });

    // Refresh Token: Yeslai 30 days rakha
    Cookies.set("refreshToken", refresh, { 
        expires: 30, 
        path: '/',
        secure: true,
        sameSite: 'strict'
    });

    return res.data;
  } catch (error: any) {
    // Exact error message pathaune
    const errorMsg = error.response?.data?.detail || "Invalid username or password";
    throw new Error(errorMsg);
  }
};