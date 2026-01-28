import axios from "axios";

const baseURL = "https://api.edifynepal.com";

const publicApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default publicApi;