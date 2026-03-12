import React, { useEffect, useState, useMemo, useContext } from "react";
import service from "../services/config.services";
import PaymentIntent from "../components/PaymentIntent";
import { CartContext } from "../context/cart.context.jsx";

function CartPage() {
  const { refreshCart } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  //const [checkoutCart,setCheckoutCart]= useState(null)
  const [loading, setLoading] = useState(true);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await service.get("/cart");
      setCart(response.data);
      refreshCart();
    } catch (error) {
      console.log("Load cart failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      const qty = item.quantity || 0;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  const handleQtyChange = async (productId, newQty) => {
    if (newQty <= 0) {
      return handleDelete(productId);
    }

    const currentItem = cart?.items?.find((item) => item.product?._id === productId);
    const currentQty = currentItem?.quantity || 0;
    const delta = newQty - currentQty;

    if (delta === 0) return;

    try {
      await service.patch("/cart/update", {
        productId,
        quantity: delta,
      });
      await loadCart();
      refreshCart();
    } catch (error) {
      console.log("Update quantity failed:", error);
    }
  };

  const handleDelete = async(productId) =>{
    
    try {
      await service.delete(`/cart/remove/${productId}`)
      const response = await service.get(`/cart`)
      setCart(response.data)
      refreshCart();
    } catch (error) {
      console.log(error)
    }

  }
  /*   const handleProceed = async () => {
    try {
      await service.delete(`/cart`);
    } catch (err) {
      console.log("Failed to clear the server cart:", err)
    }
    setCheckoutCart(cart)
    setCart(null)
    refreshCart()
    setShowPaymentIntent(true)
  } */

  if (loading) return <div className="p-12 text-center">Loading cart...</div>;
  // console.log(cart);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Your Cart
        </h1>

        {cart?.items?.length ? (
          <>
            {/* Items List */}
            <div className="space-y-6 mb-12">
              {cart.items.filter(item=>item.product).map((item) => (
                <div
                  key={item.product._id}
                  className="relative bg-white shadow-lg rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all"
                >
                  <div
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleDelete(item.product._id)}
                  >
                    ✕
                  </div>
                  <div className="flex items-center gap-6">
                    {/* Image */}
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-2xl flex-shrink-0 shadow-md"
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-lg text-gray-600 mb-4">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        <label className="mr-2">Qty:</label>
                        <select
                          value={item.quantity || 1}
                          onChange={(e) =>
                            handleQtyChange(item.product._id, Number(e.target.value))
                          }
                          className="border rounded-md px-2 py-1"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </p>
                      <p className="text-xl font-bold text-emerald-600">
                        Item Total: $
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {showPaymentIntent === false ? (
                <button
                  onClick={() => setShowPaymentIntent(true)}
                  //onClick={handleProceed}
                  className="w-full mt-6 bg-white text-emerald-600 py-4 px-8 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all shadow-xl"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <PaymentIntent
                  cart={{
                    ...cart,
                    items: (cart?.items || []).filter((i) => i.product),
                  }}
                 /*  cart={{
                    ...checkoutCart,
                    items: (checkoutCart?.items || []).filter((i) => i.product),
                  }} */
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="w-24 h-24 bg-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              🛒
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <a
              href="/products"
              className="bg-emerald-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:bg-emerald-700 transition-all shadow-lg"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
