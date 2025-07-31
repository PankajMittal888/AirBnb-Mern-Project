import React from 'react'
import { useContext } from 'react';
import { createContext } from 'react'
import { authProvider } from './AuthContext.jsx';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
export const CurrentUserContext=createContext();
axios.defaults.withCredentials = true;

const UserContext = ({children}) => {
    const {server}=useContext(authProvider);
    const[currentUser,setCurrentUser]=useState(null);

    const getCurrentUser=async()=>{
      try { 
        // console.log(server);
        
         let user=await axios.get(server+"/api/user/currentUser",
            {withCredentials:true}
         );
        //  console.log(user);
         
       if(!user){
        console.log("error is occcur when the currnet user find");
       }
       setCurrentUser(user.data)
       console.log(user);
      } catch (error) {
        console.log("error is occcur when the currnet user find"+error);
        setCurrentUser(null)
      }
    }


    useEffect(()=>{
        getCurrentUser()
    },[])

let value={
currentUser,setCurrentUser,getCurrentUser
}
  return (
    <CurrentUserContext.Provider value={value}>
        {children}
    </CurrentUserContext.Provider>
  )
}

export default UserContext;