import React from 'react'
import '../login/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios, { Axios } from 'axios'

function Register() {
    const isAuthenticated = () => {
        return !!localStorage.getItem('token'); 
    };
    
    // If the user is authenticated, redirect them to the homepage
    if (isAuthenticated()) {
        window.location.href = '/'; 
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.username.value
        const pass = e.target.password.value
        const confpass = e.target.confpassword.value
        if (pass !== confpass) {
            alert('Password does not match')
            return
        }
        //data senting to server
        try {
            await axios.post('http://localhost:7000/user/register', {
                name: name,
                email: email,
                password: pass
            }).then((res) => {
                console.log(res.data)
                if (res.status === 201) {
                    window.location.href = '/login';
                }


            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
            </div>
            <div className="text-center mt-4 name">
                Twitter
            </div>
            <form className="p-3 mt-3" onSubmit={handleRegister}>
                <div className="form-field d-flex align-items-center">
                    <span className="fa fa-user"></span>
                    <input type="text" name="name" placeholder="Full Name" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fa fa-user"></span>
                    <input type="text" name="username" placeholder="Email" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fa fa-key"></span>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fa fa-key"></span>
                    <input type="password" name="confpassword" placeholder="Confirm Password" />
                </div>
                <button type='submit' className="btn mt-3">Register</button>
            </form>
            <div className="text-center fs-6">
                <small className='text-muted'>Having Account <Link to="/login">Login</Link></small>
            </div>
        </div>
    )
}

export default Register