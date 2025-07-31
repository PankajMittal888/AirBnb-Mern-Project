import React, { useContext } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/UserContext';
import Card from '../components/Card';

const MyListing = () => {
    const navigate=useNavigate()
    let {currentUser}=useContext(CurrentUserContext);
    console.log(currentUser?.user?.listing);
    
  return (
 <div className="min-h-screen md:[h-100vh] w-full bg-gray-50 p-2 relative flex flex-col items-center justify-start">
     <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 bg-gradient-to-r  from-[#11244d] to-[#90aace] text-white p-4 rounded-full shadow-md hover:scale-105 transition-all z-10"
            aria-label="Go back"
          >
            <FaArrowLeftLong size={20} />
          </button>
          <div className='w-[60%] md:w-[40%] mt-[3rem] mb-6 p-3 flex items-center justify-center border-2 border-blue-950'>
            <h1 className='font-bold text-2xl'>MY LISTING</h1>
          </div>
        <div className='w-[90%] h-[78vh] flex items-center  justify-center flex-wrap gap-8 px-3 py-2'>
          {currentUser?.user?.listing?.map((list)=>(
             <Card key={list._id} list={list} />
          ))}
      </div>
      </div>
  )
}

export default MyListing