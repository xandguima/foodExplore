import React from 'react'
import ReactDOM from 'react-dom/client'
import{ SignUp } from './pages/SingUp'
import { SignIn } from './pages/SignIn'
import { Home } from './pages/Home'
import { Preview } from './pages/Preview'
import { Slidebar } from './pages/SlideBar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Slidebar/>
  </React.StrictMode>,
)
