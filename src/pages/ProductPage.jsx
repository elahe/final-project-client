import { useState } from "react";
import { Link } from "react-router-dom";
import service from "../services/config.services";

function ProductPage({products}) {
  const [isClicked, setIsClicked]= useState(false)
  
   const handleAddingToCart = async (product) => {
    try {
      await service.patch("/cart/update", {
        productId: product._id,
        quantity: 1  // Add 1 item
      });
      setIsClicked(true);
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.log("Add failed:", error);
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-4 gap-8">
        {products.map((eachproduct) => {
          return (
            <div key={eachproduct._id} className="border border-gray-200">
              {/* Image */}
              <img
                src={eachproduct.imageUrl}
                alt={eachproduct.name}
                className="w-full h-80 object-cover"
              />

              {/* Content */}
              <div className="bg-gray-100 p-6">
                {/* Designer */}
                <p className="text-sm tracking-widest text-gray-500 uppercase">
                  {eachproduct.designer}
                </p>

                {/* Title */}
                <Link to={`/products/${eachproduct._id}`}>
                  <h3 className="text-2xl font-semibold mt-1 mb-3">
                    {eachproduct.name}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {eachproduct.description}
                </p>

                {/* Price + Button */}
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">${eachproduct.price}</p>

                  <button
                    onClick={()=>handleAddingToCart(eachproduct)}
                    className="bg-yellow-400 px-6 py-2 font-medium hover:bg-yellow-500 transition"
                    >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default ProductPage