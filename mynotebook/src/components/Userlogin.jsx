import React, { useState } from 'react';
import './Css/loginsignup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex justify-center mt-10">
        <div className='background flex flex-col justify-center items-center text-black'>
            <h1 className='title text-center text-2xl '>Login</h1>
            <form className="w-full p-4">
                <div className="mb-4">
                    <label className="block text-black mb-1">Email:</label>
                    <input 
                    type='text' 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none" 
                    placeholder="Enter your email" 
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-black mb-1">Password:</label>
                    <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter your password"
                    />
                    <span 
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon className='mt-5' icon={passwordVisible ? icon.faEyeSlash : icon.faEye} />
                    </span>
                </div>
                <div className='flex justify-center'>
                    <button type='submit'  className=" buttonsubmit text-white font-bold py-2 rounded-lg">
                        Login
                    </button>
                </div>
                </form>
                <div className="gologin">
                    <h1>Don't Have an account <Link to='/signup'>SigunUP</Link></h1>
                </div>
            </div>
        </div>
    );
}
export default Login;
