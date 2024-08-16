import axios from "axios";

export const goitApi = axios.create({
  baseURL: "https://victorybackend.onrender.com/",
});

export const updateAuthHeader = (token) => {
  goitApi.defaults.headers.common["Authorization"] = token;
};

export const clearAuthHeader = () => {
  goitApi.defaults.headers.common["Authorization"] = "";
};
