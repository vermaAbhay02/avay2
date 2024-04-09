import React from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navi = useNavigate();

    const isAuthenticated = () => {
        return !!localStorage.getItem('token'); 
    };
    
    if (isAuthenticated()) {
        navi("/"); // Redirect to the homepage or any other page
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post('http://localhost:7000/user/login', {
                email,
                password
            });
            if (response.status === 200) {
                const { token, uname } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('name', uname);
                navi("/");
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (error) {
            console.error(error.message);
            // Handle error and provide feedback to the user (e.g., show error message)
        }
    };

    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
            </div>
            <div className="text-center mt-4 name">
                Twitter
            </div>
            <form className="p-3 mt-3" onSubmit={handleLogin}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" name="email" id="userName" placeholder="Email" />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" name="password" id="pwd" placeholder="Password" />
                </div>
                <button type='submit' className="btn mt-3">Login</button>
            </form>
            <div className="text-center fs-6">
                <small className='text-muted'>Don't Have an Account? <Link to="/signup">Sign up</Link></small>
            </div>
        </div>
    );
};

export default Login;
