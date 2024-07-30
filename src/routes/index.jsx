import {UserRoutes} from './user.routes';
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";
import { BrowserRouter } from "react-router-dom";
import { AdminRoutes } from './admin.routes';

export function Routes(){
  const {user} = useAuth();
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