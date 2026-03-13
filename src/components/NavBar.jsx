import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FaUser, FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";

export default function NavBar() {
  const { loggedUserRole,isLoggedIn,logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/">
        <img src={logo} alt="logo" className="w-30" />
      </Link>

      <div className="flex items-center gap-6 text-2xl">
        {isLoggedIn === true && <div className="cursor-pointer text-xs" onClick={logout} >logout</div>}
        {/* User Icon */}
        <Link to={loggedUserRole === "stylist" ? "/creator" : "/signup"}>
          <FaUser className="cursor-pointer" />
        </Link>

        {/* basket */}
        <Link to="/cart">
          <div className="relative cursor-pointer">
            <FaShoppingBasket />

            <span
              className="absolute -top-2 -right-2 
                bg-black text-white text-xs 
                w-5 h-5 flex items-center justify-center 
                rounded-full"
            >
              {cartCount}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
