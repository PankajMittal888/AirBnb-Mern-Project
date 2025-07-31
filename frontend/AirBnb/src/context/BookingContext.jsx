import axios from 'axios';
import React, { Children, createContext, useContext, useState } from 'react'
import { CurrentUserContext } from './UserContext';
import { authProvider } from './AuthContext';
import { CreateListingContext } from './ListingContext';
import { toast } from 'react-toastify';
export let BookDataContext=createContext();

const BookingContext = ( {children}) => {
    const[checkIn,setCheckIn]=useState("")
     const[CheckOut,setCheckOut]=useState("")
      const[night,setNight]=useState(0);
      const[total,setTotal]=useState(0);
      const[bookData,setBookData]=useState([])
      const {server}=useContext(authProvider)
      const{getCurrentUser}=useContext(CurrentUserContext)
      // const {}=useContext()
      const {GetListing}=useContext(CreateListingContext)


      const HandleBooking=async(id)=>{
        try {
          console.log(id);
          
          let res=await axios.post(server+`/api/book/create/${id}`,{
            checkIn,checkOut:CheckOut,totalRent:total
          },{withCredentials:true})
            setBookData(res.data)
                toast.success("booking Confirm");
            await getCurrentUser();
            await GetListing();
            console.log(res.data);
        } catch (error) {
          console.log("error come in booking context",error);
            toast.error(error.response.data.message);
        }
      }



      
  const CancelBooking = async (id) => {
  console.log("here is id", id);

  try {
    const res = await axios.delete(
      `${server}/api/book/cancel/${id}`,
      {}, // no request body, so send empty object
      { withCredentials: true } // correct config
    );

    await getCurrentUser();  // refresh user data
    await GetListing();      // refresh listings
    console.log(res.data);
  } catch (error) {
    console.log("error in CancelBooking", error.response?.data || error.message);
  }
};



  let value={
checkIn,setCheckIn,CheckOut,setCheckOut,night,setNight,total,setTotal,HandleBooking,bookData,setBookData,CancelBooking
    }
    
  return (
    <BookDataContext.Provider value={value}>
        {children}
    </BookDataContext.Provider>
  )
}

export default BookingContext;