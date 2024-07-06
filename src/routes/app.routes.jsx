import { Home } from '../pages/Home'
import { Preview } from '../pages/Preview'
import { NewDish } from '../pages/NewDish'

import { Route, Routes } from 'react-router-dom'



export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/new-dish" element={<NewDish />} />
    </Routes>
  )
}