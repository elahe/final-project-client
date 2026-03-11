import React from 'react'
import logo from "../assets/logo.png"
import { FaUser, FaShoppingBasket } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="flex justify-between items-center p-4">

        
        <Link to='/'>
            <img src={logo} alt="logo" className="w-24"/>
        </Link>

        
        <div className="flex items-center gap-6 text-2xl">

            {/* User Icon */}
            <Link to="/signup">
                <FaUser className="cursor-pointer"/>
            </Link>

            {/* basket */}
            <Link to="/cart">
                <div className="relative cursor-pointer">
                <FaShoppingBasket />

                <span className="absolute -top-2 -right-2 
                bg-black text-white text-xs 
                w-5 h-5 flex items-center justify-center 
                rounded-full">
                    cart.lengh
                </span>

            </div>
            </Link>

        </div>
    </div>
  )
}