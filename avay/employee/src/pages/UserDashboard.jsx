import React, { useEffect } from 'react'
import './custom.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function UserDashboard() {
    const name = localStorage.getItem('name');
    const navi = useNavigate();


    const token = localStorage.getItem('token');
    useEffect(() => {
    if (token) {
        navi('/');
    } else {
        navi('/login');

    }
}, [token]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:7000/user/logout', null, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            if (response.status === 200) {
                localStorage.clear();
                navi("/login");
            } else {
                throw new Error('Logout failed');
            }
        } catch (err) {
            console.error(err);
            // Handle specific error cases, e.g., 404 not found
            if (err.response && err.response.status === 404) {
                console.error('Logout endpoint not found');
            } else {
                console.error('Logout failed:', err.message);
            }
        }
    }

    return (
        <div className="container mt-4 shadow1 p-4 border1 b-radius d-flex align-items-center justify-content-center" style={{ height: "70vh" }}>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="head-title text-center">
                        <h2 className='text-center mr-4'>Welcome <span className='text-danger'>{name}</span>!</h2> <span></span>
                    </div>
                    <div className="text-center ml-4">
                        <button className="button-82-pushable ml-4 w-100 " role="button" onClick={handleLogout}>
                            <span className="button-82-shadow"></span>
                            <span className="button-82-edge"></span>
                            <span className="button-82-front text">
                                LOGOUT
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default UserDashboard