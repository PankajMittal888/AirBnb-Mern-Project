import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useContext } from 'react';
import { authProvider } from '../context/AuthContext';
import axios from 'axios';
import { CurrentUserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
       const [show, setShow] = useState(false);
       const navigate=useNavigate();
       const {server}=useContext(authProvider);
        const[email,setEmail]=useState("");
        const[password,setPassword]=useState("");
        const{getCurrentUser,currentUser,setCurrentUser} =useContext(CurrentUserContext)

        const HandleLogin=async(e)=>{
               e.preventDefault();
              try {
                 let res=await axios.post(server+"/api/auth/login",{
                email,
                password
               },{withCredentials:true})
               console.log(res);
               getCurrentUser();
               setCurrentUser(res.data);
               navigate('/');
                toast.success("Login SuccesFully")

              } catch (error) {
                console.log("some error comes when login"+error);
                 toast.error(error.response.data.message);
              }
        }
  return (
    <div>
         <div className='min-h-screen bg-gradient-to-br from-slate-800 via-slate-500 to-slate-900 flex justify-center items-center px-4'>
             <button
                    onClick={() => navigate('/')}
                    className='absolute top-5 left-5 bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-indigo-600 transition-all p-4 rounded-full shadow-md'
                    aria-label="Go back"
                  >
                    <FaArrowLeftLong size={20} />
                  </button>
                    <form className='w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-6' onSubmit={HandleLogin}>
                        <h1 className='text-3xl md:text-4xl font-bold text-center text-slate-900'>
                            Welcome to CoziStay
                        </h1>
        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-base font-medium text-slate-700'>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter your email'
                                className='p-3 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-[16px]'
                                  onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
        
                        <div className='flex flex-col gap-2 relative'>
                            <label htmlFor="password" className='text-base font-medium text-slate-700'>Password</label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                placeholder='Enter a secure password'
                                className='p-3 pr-12 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-[16px]'
                                  onChange={(e)=>setPassword(e.target.value)}
                            />
                            {show ? (
                                <IoIosEyeOff
                                    className='absolute right-4 top-11 text-gray-500 cursor-pointer hover:text-indigo-500 transition'
                                    size={24}
                                    onClick={() => setShow(prev => !prev)}
                                />
                            ) : (
                                <IoIosEye
                                    className='absolute right-4 top-11 text-gray-500 cursor-pointer hover:text-indigo-500 transition'
                                    size={24}
                                    onClick={() => setShow(prev => !prev)}
                                />
                            )}
                        </div>
        
                        <button
                            type='submit'
                            className= "border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#6983a8]   text-white text-lg font-semibold py-[10px] rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out w-[40%]"
                        >
                            Login
                        </button>

                        <p className="text-center text-sm text-slate-500 mt-2">
                    create new account? <span className="text-indigo-600 font-medium cursor-pointer hover:underline" onClick={()=>navigate('/signup')} >Sign Up</span>
                </p>
        
                    </form>
                </div>
    </div>
  )
}

export default Login