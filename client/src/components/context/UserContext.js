import React, { createContext, useContext, useState, useEffect } from 'react';

const userContext = createContext()



const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    })


    const logout = () => {
        setToken(null)
        localStorage.removeItem("token")
        setUser(null)
    }






    return (
        <userContext.Provider value={{user, setUser, token , setToken, logout}}>
            {children}
        </userContext.Provider>
       

    )
}



export  {userContext, ContextProvider}