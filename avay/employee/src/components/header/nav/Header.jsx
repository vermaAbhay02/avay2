import React from 'react'


const Header = ({data}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <a href="#" className="navbar-brand">Brand</a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
                <a href="/dash" className="nav-item nav-link active">Home</a>
                <a href="#" className="nav-item nav-link">Profile</a>
                <a href="#" className="nav-item nav-link">Messages</a>
            </div>
            <div className="navbar-nav ms-auto">
                <a href="#" className="nav-item nav-link">Logout</a>
            </div>
        </div>
    </div>
</nav>
  )
}

export default Header