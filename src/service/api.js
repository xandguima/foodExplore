import axios from "axios"


export const api = axios.create({
  baseURL:"http://localhost:3333",
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