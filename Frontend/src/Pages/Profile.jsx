import React from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
export default function Profile() { 
  const navigate = useNavigate();
  let [data, setData] = useState({});
  let token = JSON.parse(localStorage.getItem('userData'))?.token;
  let id = JSON.parse(localStorage.getItem('userData'))?.id;
  const fetchData = async ()=>{
    try{
      let res = await axios.get(`http://localhost:5000/profile/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if(res.status === 200){
        setData(res.data.data);
      }else{
        toast.error("Could not fetch profile data");
      }
    }catch(err){
      console.error(err);
      const message = err.response?.data?.message || "Could not fetch profile data";
      toast.error(message);
    }
    }
    useEffect(()=>{
      fetchData();
    },[])
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar login='true' username={data.firstname} id={id}></Navbar> 
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-4xl font-bold text-white mb-8 text-center'>Profile</h2>
          <div className='bg-gray-800 rounded-lg shadow-lg p-8'>
            <div className='mb-6 w-full flex justify-center'>
              <img 
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                alt="Profile Avatar"
                className='w-32 h-32 rounded-full border-4 border-blue-500'/>
            </div>
            <div className='space-y-6'>
              <div className='border-b pb-4'>
                <p className='text-sm text-white uppercase tracking-wide font-semibold'>Name</p>
                <p className='text-2xl font-semibold text-gray-400 mt-2'>{data.firstname} {data.lastname}</p>
              </div>
              
              <div className='border-b pb-4'>
                <p className='text-sm text-white uppercase tracking-wide font-semibold'>Email</p>
                <p className='text-lg text-gray-400 mt-2'>{data.userEmail}</p>
              </div>
              
              <div className='pb-4'>
                <p className='text-sm text-white uppercase tracking-wide font-semibold'>Phone Number</p>
                <p className='text-lg text-gray-400 mt-2'>{data.phoneNumber}</p>
              </div>
            </div>
          </div>

          <button onClick={() => {
            localStorage.removeItem('userData');
            navigate('/login');
          }} className='w-full mt-8 border-2 border-transparent bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500 hover:cursor-pointer  text-white font-bold py-3 px-4 rounded-lg transition duration-200'>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}