import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ProductPage({ products }) {
  const { loggedUserId } = useContext(AuthContext);

  const [filter, setFilter] = useState("all");

  //filter gender

  const getFilter = () => {
    if (filter === "women") {
      return products.filter((product) => product.gender === "women");
    }
    if (filter === "men") {
      return products.filter((product) => product.gender === "men");
    }
    if (filter === "kids") {
      return products.filter((product) => product.gender === "kids");
    }
    if (filter === "unisex") {
      return products.filter((product) => product.gender === "unisex");
    }
    if (filter === "all") {
      return products;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center gap-4 mb-10 flex-wrap ">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 rounded-full border transition ${
            filter === "all"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("women")}
          className={`px-5 py-2 rounded-full border transition ${
            filter === "women"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Women
        </button>

        <button
          onClick={() => setFilter("men")}
          className={`px-5 py-2 rounded-full border transition ${
            filter === "men"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Men
        </button>

        <button
          onClick={() => setFilter("kids")}
          className={`px-5 py-2 rounded-full border transition ${
            filter === "kids"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Kids
        </button>

        <button
          onClick={() => setFilter("unisex")}
          className={`px-5 py-2 rounded-full border transition ${
            filter === "unisex"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Unisex
        </button>
      </div>
      <div className="grid md:grid-cols-4 gap-8 ">
        {getFilter().map((eachproduct) => {
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
                      <Link to={`/products/${eachproduct._id}`}>
                        see details
                      </Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductPage;
