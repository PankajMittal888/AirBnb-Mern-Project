import React, { Children } from 'react'
import { createContext } from 'react'
export const authProvider=createContext();

const AuthContext = ({children}) => {
    let server="http://localhost:8000";
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