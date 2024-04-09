import { useState } from 'react'
import Layout from './components/layout/Layout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/register/Register';
import Login from './components/login/Login';
import UserDashboard from './pages/UserDashboard';
import Dashboard from './pages/admin/Dashboard';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
       <Route index element={<UserDashboard />} />
       <Route path='/signup' element={<Register />} />
       <Route path='/login' element={<Login />} />
       <Route path='/admin/dash' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
