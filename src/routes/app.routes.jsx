import { Home } from '../pages/Home'
import { Preview } from '../pages/Preview'
import { NewDish } from '../pages/NewDish'
import {EditDish} from '../pages/EditDish'
import { Route, Routes,Navigate } from 'react-router-dom';
import { Cart } from '../pages/Cart'
import { PaymentMobile } from '../pages/Payment_Mobile'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/new-dish" element={<NewDish />} />
      <Route path="/edit-dish/:id" element={<EditDish />} />
      <Route path="/orders" element={<Cart />} />
      <Route path="/orders/payment" element={<PaymentMobile />} />
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}
