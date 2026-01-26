import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Footer from '../Components/Footer';
export default function Login() {
const [userEmail, setUserEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail || !password) {
        toast.error('All fields are required');
        return; 
    }
    try{
        let payload = {userEmail, password};
        let res = await axios.post('https://mynote-backend-s1ae.onrender.com/login', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.status === 200){
            toast.success("Login successful");
            localStorage.setItem('userData', JSON.stringify(res.data.data));
            navigate(`/notes/${res.data.data.id}`);
        }else{
            toast.error("Login failed");
        }
    }catch(err){
        const message = err.response?.data?.message || "Login failed";
        toast.error(message);
        console.error(err.response?.data);
    }
};

return (
    <div className='min-h-screen flex flex-col bg-gray-900 space-y-8'>
        <Navbar />
        <div className='bg-gray-800 rounded-lg shadow-2xl mx-auto m-auto p-8 w-full max-w-md border border-gray-700'>
            <h1 className='text-3xl font-bold mb-8 text-white text-center'>Welcome Back</h1>
            <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                    <input 
                        type="email" 
                        placeholder="Enter your email..." 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-600 rounded-lg px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                >
                    Login
                </button>
            </form>
            <p className='text-center text-gray-400 mt-6'>Don't have an account? <Link to={"/Signup"} className='text-blue-400 hover:underline'>Sign up</Link></p>
        </div>
        <Footer />
    </div>
);
}
