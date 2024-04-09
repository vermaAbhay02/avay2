import React from 'react'
import Header from '../header/nav/Header'
import { Outlet, useNavigate} from 'react-router-dom'

const Layout = () => {
  

  return (
    <div>
        <div className="container">
          <Outlet />
        </div>
    </div>
  )
}

export default Layout