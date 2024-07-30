import axios from "axios"


export const api = axios.create({
  baseURL:"https://backendfoodexplore.onrender.com",
  withCredentials: true

});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data.message === "JWT Token inválido") {
      localStorage.removeItem("@FoodExplorer:user");
      localStorage.removeItem("@FoodExplorer:cart");
      
    }
    return Promise.reject(error);
  }
);