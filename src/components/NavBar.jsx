import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { FaUser, FaShoppingBasket } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import service from "../services/config.services";

export default function NavBar() {
  const { loggedUserRole, isLoggedIn } = useContext(AuthContext)


  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const response = await service.get("/cart")
        const cartItems = (response.data?.items || []).filter((item) => item.product)
        const count = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
        setCartItemCount(count)
        // setCartItemCount(response.data)
        // console.log(count)
      } catch (err) {
        setCartItemCount(0)
      }
    }

    if (isLoggedIn) {
      loadCartCount()
    } else {
      setCartItemCount(0)
    }
  }, [isLoggedIn])

  return (
    <div className="flex justify-between items-center p-4">

        
        <Link to='/'>
            <img src={logo} alt="logo" className="w-24"/>
        </Link>

        
        <div className="flex items-center gap-6 text-2xl">

            
            
            {/* User Icon */}
            <Link to={loggedUserRole === "stylist" ? "/creator" : "/signup"}>
                <FaUser className="cursor-pointer" />
            </Link>

            {/* basket */}
            <Link to="/cart">
                <div className="relative cursor-pointer">
                <FaShoppingBasket />

                <span className="absolute -top-2 -right-2 
                bg-black text-white text-xs 
                w-5 h-5 flex items-center justify-center 
                rounded-full">
                    {cartItemCount}
                </span>

            </div>
            </Link>

        </div>
    </div>
  )
}