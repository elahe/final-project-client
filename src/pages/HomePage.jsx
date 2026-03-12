import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage({ products }) {
  const { loggedUserId } = useContext(AuthContext)
  return (
    <div>
      <section
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* text */}
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Curated Style, Delivered.
          </h1>

          <p className="text-white/90 text-lg md:text-xl">
            Complete looks crafted by professional stylists. Browse, add to
            cart, done.
          </p>
        </div>
      </section>
      <h2 className="text-4xl font-bold mb-10">All Looks</h2>

      <div className="grid md:grid-cols-4 gap-8">
        {products.slice(0, 4).map((eachproduct) => {
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

                  {loggedUserId && (
                    <button className="bg-green-400 px-6 py-2 font-medium hover:bg-green-500 transition">
                      <Link to={`/products/${eachproduct._id}`}>see details</Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-12">
  <Link to="/products">
    <button className="px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition">
      See More
    </button>
  </Link>
</div>
    </div>
  );
}

export default HomePage;
