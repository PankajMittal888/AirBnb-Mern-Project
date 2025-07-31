import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { BookDataContext } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import Star from '../components/Star';
import { authProvider } from '../context/AuthContext';
import axios from 'axios';
import { CreateListingContext } from '../context/ListingContext';
import { CurrentUserContext } from '../context/UserContext';
  

const Booked = () => {
        const {server}=useContext(authProvider)
    let {bookData}=useContext(BookDataContext);
    let rent=Math.round(bookData?.booking?.totalRent);
    let {card}=useContext(CreateListingContext);
    const {GetListing}=useContext(CreateListingContext)
const{getCurrentUser}=useContext(CurrentUserContext)
    const[star,setStar]=useState(0)

    const HandleStar=(value)=>{
        setStar(value)
    }


     const HandleRating=async (id)=>{
                    try {
                      let res=axios.post(server+`/api/listing/rating/${id}`,{rating:star},{withCredentials:true})
                   
                      await getCurrentUser();
                      await GetListing();
                         console.log(res.data);
                         navigate('/');
                    } catch (error) {
                        console.log("error conme in rating context",error);
                    }
                  }

    
    let navigate=useNavigate();
  return (
    <div className='relative'>
        <div className='w-[100%] h-[100vh] flex items-center justify-center bg-[#c9dbf3] gap-5 flex-col'
        >
            <div className='w-[90%] md:w-[50%] h-[50%] flex items-center bg-amber-50 justify-center flex-col gap-2 p-5  rounded-lg'>
             <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 mb-3 px-5 flex-col'>
                    <GiConfirmed className='w-[80px] h-[80px] text-green-700'/>
                   <h2 className='text-2xl font-semibold'>Booking Confirmed</h2>
             </div>
             <div className='w-[100%] flex items-center justify-between gap-2  text-[16px] md:text-[18px]'>
                        <span className='font-semibold'>
                                Booking Id : 
                        </span>
                        <span >
                                {bookData?.booking?._id}
                        </span>
             </div>

               <div className='w-[100%] flex items-center justify-between gap-2  text-[16px] md:text-[18px]'>
                        <span className='font-semibold'>
                                Owner Details : 
                        </span>
                        <span>
                                {bookData?.booking?.host}
                        </span>
             </div>

               <div className='w-[100%] flex items-center justify-between gap-2  text-[16px] md:text-[18px]'>
                        <span className='font-semibold'>
                                Total Rent : 
                        </span>
                        <span>
                              rs.{rent}
                                {/* {console.log(bookData?.bookig?.totalRent)
                                } */}
                        </span>
             </div>
            </div>


            <div className='w-[90%] md:w-[50%] h-[25%] flex items-center bg-amber-50 justify-center flex-col gap-4 p-3  rounded-lg'>
                <h1 className='text-[20px] font-semibold'>{star} out of 5 ratings</h1>
                {/* <FaStar className='text-[22px]'/>
                 */}
                 <Star onRate={HandleStar}/>

                           <div className="border border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white px-8 py-2 rounded-2xl shadow-md text-md font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2" onClick={()=>HandleRating(card._id)}>
                            Submit
                         </div>  

            <div/>

            </div>

        </div>
         <div className="absolute top-6 right-6 border border-gray-700 bg-gradient-to-r from-[#0e1d3b] to-[#7f9ac0] text-white px-6 py-3 rounded-full shadow-md text-md font-medium z-10 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/')}>
        Back to home
      </div>
    </div>
  )
}

export default Booked