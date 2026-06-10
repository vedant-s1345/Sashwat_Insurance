import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Calculator from './pages/Calculator.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Careers from './pages/Careers.jsx'
import NotFound from './pages/NotFound.jsx'
import { useAuth } from './context/AuthContext.jsx'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products"   element={<Products />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="careers"    element={<Careers />} />
        <Route path="login"      element={<Login />} />
        <Route path="register"   element={<Register />} />
        <Route path="dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*"          element={<NotFound />} />
      </Route>
    </Routes>
  )
}
