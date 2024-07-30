import axios from "axios"


export const api = axios.create({
  baseURL:"https://backendfoodexplore.onrender.com",
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data.message === "JWT Token inválido") {
      localStorage.removeItem("@FoodExplorer:token");
      localStorage.removeItem("@FoodExplorer:user");
      localStorage.removeItem("@FoodExplorer:cart");
      
    }
    return Promise.reject(error);
  }
);