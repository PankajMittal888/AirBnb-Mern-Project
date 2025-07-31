// import React, { useState } from 'react';
// import { IoIosEye } from "react-icons/io";
// import { IoIosEyeOff } from "react-icons/io";

// const Signup = () => {
//     const[show,setShow]=useState(false);
//   return (
//     <div className='w-[100%] h-[100vh] bg-amber-300 flex justify-center items-center'>
//         <form className='max-w-[900px] w-[90%] bg-amber-100 flex justify-center items-start flex-col px-5 py-2 gap-4'>
//             <h1 className='md:text-5xl text-3xl font-medium'>WelCome to CoziStay</h1>
//             <div className='flex flex-col gap-3 mt-4 w-[100%]'>
//                 <label className='text-xl' htmlFor="name">Name:</label>
//                 <input className='w-[90%] p-3 rounded-xl outline-none border-gray-400 border text-[18px]' type="text" id="name" placeholder='Enter your name' />
//             </div>
//              <div className='flex flex-col gap-3 w-[100%]'>
//                 <label className='text-xl' htmlFor="email">Email:</label>
//                 <input className='w-[90%] text-[18px] p-3 rounded-xl outline-none border-gray-400 border' type="email" id="email" placeholder='Enter your email' />
//             </div>
//              <div className='flex flex-col gap-3 w-[100%] relative'>
//                 <label className='text-xl' htmlFor="password">Password:</label>
//                 <input className='w-[90%] text-[18px] p-3 rounded-xl outline-none border-gray-400 border' type={show?"text":"password"} id="password" placeholder='Enter a Secure password'/>
//              {!show && <IoIosEye className='absolute w-[22px] h-[22px] right-[12%] bottom-4 cursor-pointer' onClick={()=>setShow(prev=>!prev)}/>}
//             {show && <IoIosEyeOff className='absolute w-[22px] h-[22px] right-[12%] bottom-4 cursor-pointer' onClick={()=>setShow(prev=>!prev)} />}
             
//             </div>
//             <button type='submit' className='p-3 md:px-6 px-9 mt-2 md:w-[20%]  bg-amber-500 rounded-2xl text-xl' >SignUp</button>
//         </form>
//     </div>
//   )
// }

// export default Signup

import React, { useContext, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import  { authProvider } from '../context/AuthContext';
import { CurrentUserContext } from '../context/UserContext';
import axiox from "axios";
import { toast } from 'react-toastify';

const Signup = () => {
    const [show, setShow] = useState(false);
    const navigate=useNavigate();
    const {server} = useContext(authProvider)
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
     const{currentUser,setCurrentUser} =useContext(CurrentUserContext);

    const HandleSignup=async (e)=>{
        e.preventDefault();
        try {
        let result= await axiox.post(server+"/api/auth/signup",{
                    name,
                    password,
                    email
            },{withCredentials:true})
            console.log(result);
            setCurrentUser(result.data);
            toast.success("SignUp SuccesFully")
            navigate('/')
            
        } catch (error) {
            console.log("error occure in signup"+error);
             toast.error(error.response.data.message)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-800 via-slate-500 to-slate-900 flex justify-center items-center px-4'>
          <button
        onClick={() => navigate('/')}
        className='absolute top-5 left-5 bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-indigo-600 transition-all p-4 rounded-full shadow-md'
        aria-label="Go back"
      >
        <FaArrowLeftLong size={20} />
      </button>
            <form className='w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-6' onSubmit={HandleSignup}>
                <h1 className='text-3xl md:text-4xl font-bold text-center text-slate-800'>
                    Welcome to CoziStay
                </h1>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-base font-medium text-slate-700'>Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder='Enter your name'
                        className='p-3 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-[16px]'
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>

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
                    className=' border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0]   text-white text-lg font-semibold py-[10px] rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out w-[40%]'
                >
                    Sign Up
                </button>
                         <p className="text-center text-sm text-slate-500 mt-2">
                    Already have an account? <span className="text-indigo-600 font-medium cursor-pointer hover:underline" onClick={()=>navigate('/login')} >Login</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
