import React, { useContext, useEffect, useState } from "react";
import CreateProductModal from "../components/CreateProductModal";
import EditProductModal from "../components/EditProductModal";
import {AuthContext} from "../context/auth.context";
import service from "../services/config.services";

function CreatorPage() {
  const { loggedUserId } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    allUserProducts();
  }, [loggedUserId]);

  const allUserProducts = async () => {
    setLoading(true);
    try {
      const response = await service.get(`/products`);
      const userProducts = response.data.filter(product => 
        String(product.creator?._id || product.creator) === String(loggedUserId)
      );
      setProducts(userProducts);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // delete product api
  const handleDelete = async (productId) => {
    if (!confirm('Delete this product?')) return;
    try {
      await service.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      console.log('Delete failed:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  const handleNewProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => 
      p._id === updatedProduct._id ? updatedProduct : p
    ));
    setIsEditOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Products</h1>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all font-semibold"
        >
          + Create New Product
        </button>
      </div>
      
      {isEditOpen && (
        <EditProductModal 
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          product={editingProduct}
          onSuccess={handleUpdateProduct}
        />
      )}

      {isOpen && (
        <CreateProductModal 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          onSuccess={handleNewProduct}
        />
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-2xl p-6 hover:shadow-xl transition-all bg-white">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
              onError={(e) => {
                e.target.src = "./placeholder.jpg";
              }}
            />
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
            <p className="text-2xl font-semibold text-emerald-600 mb-2">${product.price}</p>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{product.category}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">{product.gender}</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {product.stockQuantity} in stock
              </span>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all font-medium text-sm"
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-all font-medium text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorPage;
