import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../context/UserContext";
import { CreateListingContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { FaStar } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { BookDataContext } from "../context/BookingContext";

const Card = ({ list }) => {
  const { image1, image2, image3, title, rent, category, city, landMark, description,rating,isBooked,host,guest } = list;
  let {currentUser}=useContext(CurrentUserContext)
  let {ViewCard}=useContext(CreateListingContext);
  let {CancelBooking}=useContext(BookDataContext)
  const[cancel,setCancel]=useState(false)
  // console.log(list._id);
  
//   console.log(list);
console.log(currentUser);

  
  let navigate=useNavigate();

  const HandleViewCard=(id)=>{
    if(currentUser){
            ViewCard(id);
    }else{
            navigate('/login')
    }
  }

  return (
    <div className="w-[340px] md:w-[320px] sm:w-[300px] rounded-lg shadow-lg overflow-hidden bg-white">
       
     
      <div className="relative group w-full h-[230px] flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"  style={{scrollbarWidth:"none"}} onClick={() => {
  if (!isBooked) {
    HandleViewCard(list._id);
  }
}}
>

        {isBooked && (
  <div className="flex items-center justify-center absolute top-2 right-1.5 text-[14px] bg-white px-2 py-0.5 rounded-full shadow-sm z-10 ">
    <GiConfirmed className="text-green-700" />
    <span className="text-green-700 ml-1 font-medium">Booked</span>
  </div>
)}


    {isBooked && guest==currentUser?.user?._id &&(
  <div className="flex items-center justify-center absolute top-10 right-1.5 text-[14px] bg-white px-3 py-0.5 rounded-full shadow-sm z-10 ">
    <FcCancel className="text-red-700" />
    <span className="text-red-700 ml-1 font-medium" onClick={()=>setCancel(true)}>Cancel</span>
  </div>
)}

{cancel &&  <div className="w-full max-w-md h-auto p-3 cursor-pointer bg-white/90 backdrop-blur-md shadow-2xl  absolute top-19 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center gap-2 z-50">
  <h1 className="text-xl font-bold text-red-600 ">Cancel Booking</h1>
  <p className="text-gray-700 text-center">Are you sure?</p>
  <div className="flex gap-4 mt-4">
    <button className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition" onClick={()=>{
      CancelBooking(list._id);
      setCancel(false)
    }}>Yes</button>
    <button className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-400 transition" onClick={()=>setCancel(false)}>No</button>
  </div>
</div>}


    
        {[image1, image2, image3].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Listing ${index + 1}`}
               
            className="w-full h-full object-cover flex-shrink-0 snap-center"
          />
        ))}
      </div>

      {/* Info section */}
      <div className="p-1 py-1.5 flex flex-col gap-1">
        <div className="flex items-center justify-between"><h2 className="font-semibold text-lg text-gray-900">{title.toUpperCase()}</h2>
            <span className="flex items-center justify-center gap-1"><FaStar className="text-orange-500"/> {rating}</span>
        </div>
        <p className="text-sm text-gray-700">{category.toUpperCase()} · {city.toUpperCase()}, {landMark.toUpperCase()}</p>
        <p className="text-[12px] text-gray-600 truncate">{description.toUpperCase()}</p>
        <p className="text-md font-bold text-[#0e1d3d]">₹ {rent} / night</p>
      </div>
    </div>
  );
};

export default Card;
