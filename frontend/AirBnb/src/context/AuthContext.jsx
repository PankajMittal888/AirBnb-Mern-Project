import React, { Children } from 'react'
import { createContext } from 'react'
export const authProvider=createContext();

const AuthContext = ({children}) => {
    let server="https://airbnb-mern-project-backend.onrender.com";
    let value={
        server
    }
  return (
    <authProvider.Provider value={value}>
        {children}
    </authProvider.Provider>
  )
}

export default AuthContext
