import React, { useContext, useState } from 'react';
import './AuthPage.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

import facebook from '../assets/facebook.svg';
import google from '../assets/google.svg';
import linkedin from '../assets/linkedin.svg';

export default function AuthPage() {

    const navigate = useNavigate();

    const { setIsLoggedIn, baseURL } = useContext(UserContext);

    const [loginSection, setLoginSection] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/user/register`, {
                name,
                email,
                password
            });

            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');
            setIsLoggedIn(true);

            toast.success('Registered Successfully', {
                position: "bottom-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
        catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            setIsLoggedIn(false);

            toast.error('An error occurred', {
                position: "bottom-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/user/login`, {
                email,
                password
            });

            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');
            setIsLoggedIn(true);

            toast.success('Logged In Successfully', {
                position: "bottom-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
        catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            setIsLoggedIn(false);

            toast.error('An error occurred', {
                position: "bottom-center",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[90vh] mx-5'>
            <div className={`container ${!loginSection && "right-panel-active"} max-w-screen-md`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={register}>
                        <h1 className='font-bold text-4xl'>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><img src={facebook} alt="" className='w-7' /></a>
                            <a href="#" className="social"><img src={google} alt="" className='w-7' /></a>
                            <a href="#" className="social"><img src={linkedin} alt="" className='w-7' /></a>
                        </div>
                        <span className='mb-4'>or use your email for registration</span>
                        <input
                            className='m-2 py-2 px-4 bg-[#dfdfdf] border-none w-full rounded outline-none'
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className='m-2 py-2 px-4 bg-[#dfdfdf] border-none w-full rounded outline-none'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className='m-2 py-2 px-4 bg-[#dfdfdf] border-none w-full rounded outline-none'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className='bg-[#FF4B2B] border-2 border-[#FF4B2B] rounded-full text-white px-6 py-2 mt-3 hover:bg-white hover:text-[#FF4B2B] transition-all'
                            type='submit'
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={login}>
                        <h1 className='font-bold text-4xl'>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><img src={facebook} alt="" className='w-7' /></a>
                            <a href="#" className="social"><img src={google} alt="" className='w-7' /></a>
                            <a href="#" className="social"><img src={linkedin} alt="" className='w-7' /></a>
                        </div>
                        <span className='mb-4'>or use your account</span>
                        <input
                            className='m-2 py-2 px-4 bg-[#dfdfdf] border-none w-full rounded outline-none'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className='m-2 py-2 px-4 bg-[#dfdfdf] border-none w-full rounded outline-none'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <a className='mt-2' href="#">Forgot your password?</a>
                        <button
                            className='bg-[#FF4B2B] border-2 border-[#FF4B2B] rounded-full text-white px-6 py-2 mt-3 hover:bg-white hover:text-[#FF4B2B] transition-all'
                            type='submit'
                        >
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='font-bold text-4xl'>Welcome Back!</h1>
                            <p className='my-6'>To keep connected with us please login with your personal info</p>
                            <button className='bg-transparent border-2 border-white rounded-full py-2 px-6 hover:bg-white hover:text-[#FF4B2B] transition-all' id="signIn" onClick={() => setLoginSection(true)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='font-bold text-4xl'>Hello, Friend!</h1>
                            <p className='my-6'>Enter your personal details and start journey with us</p>
                            <button className='bg-transparent border-2 border-white rounded-full py-2 px-6 hover:bg-white hover:text-[#FF4B2B] transition-all' id="signUp" onClick={() => setLoginSection(false)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
