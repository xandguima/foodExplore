import { Home } from '../pages/Home'
import { Preview } from '../pages/Preview'
import { NewDish } from '../pages/NewDish'
import {EditDish} from '../pages/EditDish'
import { Route, Routes,Navigate } from 'react-router-dom'


export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/new-dish" element={<NewDish />} />
      <Route path="/edit-dish/:id" element={<EditDish />} />
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}