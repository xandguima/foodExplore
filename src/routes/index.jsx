import {UserRoutes} from './user.routes';
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";
import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from './admin.routes';
import { useEffect } from 'react';
import { api } from '../service/api';
import { AppRoutes } from './app.routes';
export function Routes(){
  const {user, signOut} = useAuth();

  useEffect(() => {
    async function verifyUser(){
      await api.get('/user/validated').catch((error) => {
        if(error.response.status === 401){
          signOut();
        }
      })    
    }
    verifyUser()
  }, [])
  function  AccessRoutes(){
    if(user.rule === "admin"){
      return <AdminRoutes/>
    }else{
      return <UserRoutes/>
    }
  }

  return(
    <BrowserRouter>
      {user ? <AccessRoutes/> :<AuthRoutes/>}
    </BrowserRouter>
  )
}