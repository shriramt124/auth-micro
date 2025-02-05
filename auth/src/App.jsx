 
import './App.css'
import { Routes, Route } from "react-router-dom"
import Signup from './components/Signup'
import Login from './components/Login'
import ForgotPassword from './components/FogotPassword'
import ResetPassword from './components/ResetPassword'
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
