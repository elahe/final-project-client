import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import {Navigate} from 'react-router-dom'

export default function PrivateCreator(props) {
    const {isLoggedIn,loggedUserRole} =useContext(AuthContext)
    if(isLoggedIn && loggedUserRole === "stylist"){
       return props.children
    }else {
        return <Navigate to="/"/>
    }
  
}