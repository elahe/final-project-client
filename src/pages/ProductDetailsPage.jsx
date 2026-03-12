import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import service from "../services/config.services";
import { CartContext } from "../context/cart.context.jsx";

function ProductDetailsPage({ products }) {
  const [isClicked, setIsClicked] = useState(false);

  const { refreshCart } = useContext(CartContext);

  const handleAddingToCart = async (product) => {
    try {
      await service.patch("/cart/update", {
        productId: product._id,
        quantity: 1, // Add 1 item
      });
      setIsClicked(true);
      refreshCart();
      //alert(`${product.name} added to cart!`);
    } catch (error) {
      console.log("Add failed:", error);
    }
  };
  const { productId } = useParams();
  const product = products.find((eachProduct) => eachProduct._id === productId);
  //comments part

  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await service.get(`/comments/${productId}/product`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [productId]);
  // {console.log(comments)}

  if (!product) {
    // why it does work with safty check?
    return <h2>Loading product...</h2>;
  }
  return (
    <>
      <div className="max-w-6xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="w-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

            <p className="text-gray-500 text-lg">{product.description}</p>

            <p className="text-3xl font-semibold text-gray-900">
              €{product.price}
            </p>

            <button onClick={()=>handleAddingToCart(product)}  className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md w-fit transition">
              {isClicked ? "added": `+ Add to Cart — €${product.price}`}
              
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16 border-t pt-10">
          <Comments
            comments={comments}
            setComments={setComments}
            productId={productId}
          />
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
