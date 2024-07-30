import { BiCookie } from 'react-icons/bi';
import { api } from '../service/api';
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/session", { email, password },{
        withCredentials: true
      });  
      const { user } = response.data

      localStorage.setItem("@FoodExplorer:user", JSON.stringify(user));
      
      setData({ user })

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel entrar")
      }
    }
  }

  function signOut() {
    api.delete("/session");
    localStorage.removeItem("@FoodExplorer:user");
    localStorage.removeItem("@FoodExplorer:cart");
    setData({});
  }


  useEffect(() => {
    const user = localStorage.getItem("@FoodExplorer:user");

    if ( user) {
      
      setData({
        user: JSON.parse(user),
      })
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, user: data.user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
export { AuthProvider, useAuth }