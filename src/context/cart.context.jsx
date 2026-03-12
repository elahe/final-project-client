import { createContext, useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { AuthContext } from "./auth.context.jsx";

const CartContext = createContext();

function CartWrapper({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const response = await service.get("/cart");
      const cartItems = (response.data?.items || []).filter(
        (item) => item.product
      );
      const count = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      setCartCount(count);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshCart();
    } else {
      setCartCount(0);
    }
  }, [isLoggedIn]);

  const passedContext = { cartCount, refreshCart };

  return (
    <CartContext.Provider value={passedContext}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartWrapper };
