import { Home } from '../pages/Home'
import { Preview } from '../pages/Preview'
import { Route, Routes } from 'react-router-dom'
import { Cart } from '../pages/Cart'
import { PaymentMobile } from '../pages/Payment_Mobile'

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview/:id" element={<Preview />} />
      <Route path="/orders" element={<Cart />} />
      <Route path="/orders/payment" element={<PaymentMobile />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}