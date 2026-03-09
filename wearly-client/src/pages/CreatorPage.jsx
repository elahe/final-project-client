import React, { useContext, useEffect, useState } from "react";
import CreateProductModal from "../components/CreateProductModal";
import AuthContext from "../context/auth.context";
function CreatorPage() {
  const { loggedUserId } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch ALL user's products on page load and filter it for just the loggedIn User
   
  useEffect(()=>{
     allUserProducts()
  },[loggedUserId])

  const allUserProducts = async () => {
    if (!loggedUserId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await service.get(`/products`);
    const userProducts = response.data.filter(product => 
      product.creator?._id === loggedUserId
    );
      setProducts(userProducts)
    } catch (error) {
      setError('Failed to load products')
    }
    setLoading(false)
  };
  const handleNewProduct = (newProduct)=>{
    setProducts(prev=>[newProduct, ...prev])
  }
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Products</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all font-semibold"
          disabled={!loggedUserId}
        >
          + Create New Product
        </button>
      </div>

      {/* CreateProductModal - passes YOUR setResponse */}
      {isOpen && (
        <CreateProductModal 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          onSuccess={handleNewProduct}   // ← Bonus callback
        />
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-2xl p-6 hover:shadow-xl transition-all bg-white">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
            <p className="text-2xl font-semibold text-emerald-600 mb-2">
              ${product.price}
            </p>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {product.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {product.gender}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {product.stock} in stock
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorPage;
