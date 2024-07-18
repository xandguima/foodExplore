import {AppRoutes} from './app.routes';
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";
import { BrowserRouter } from "react-router-dom";

export function Routes(){
  const {user} = useAuth();

  return(
    <BrowserRouter>
      {user ? <AppRoutes/> :<AuthRoutes/>}
    </BrowserRouter>
  )
}