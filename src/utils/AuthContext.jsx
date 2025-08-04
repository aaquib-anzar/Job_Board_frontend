import React, { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null)
    const[loading, setLoading] = useState("")
    const BASE_URL = import.meta.env.VITE_API_BASE_URL

    useEffect(()=> {
        const checkAuth = async() => {
            try {
                const res = await axios.get(`${BASE_URL}/auth/profile`,{withCredentials:true})
                setUser(res.data.user)

            } catch (error) {
                setUser(null)
            }finally{
                setLoading(false)
            }

        }
        checkAuth()
    },[])

    return (
        <AuthContext.Provider value={{user, setUser, loading, isAuthenticated: !!user}}>
            {children}
        </AuthContext.Provider>
    )

}