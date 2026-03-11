import { useContext, useState } from "react";
import UploadImage from "./Cloudinary";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
function CreateProductModal({ isOpen, setIsOpen, onSuccess }) {
  const { loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, imageUrl });
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product data:", formData);
    try {
      const response = await service.post(`/products`,{
        ...formData,
        creator: loggedUserId
      });
      console.log(response);
      const newProduct = response.data;
      onSuccess(newProduct);
      closeModal();
      navigate(`/creator/${loggedUserId}`);
    } catch (error) {
        console.error("❌ Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Product
          </h2>
          <p className="text-gray-600">Add new product with image</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-6">
              Product Image
            </label>
            <div className="flex items-start gap-6">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Product preview"
                  className="w-48 h-48 object-cover rounded-2xl shadow-xl flex-shrink-0"
                />
              ) : (
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300 shadow-md">
                  <span className="text-gray-500 font-medium">No image</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <UploadImage setCoverImageUrl={handleImageUpload} />
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Blue Running Shoes"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="59.99"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Tell customers about this product..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Choose category</option>
                <option value="formal">formal</option>
                <option value="Bohemian">Bohemian</option>
                <option value="casual">casual</option>
                <option value="sport">sport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Choose gender</option>
                <option value="men">men</option>
                <option value="women">women</option>
                <option value="unisex">unisex</option>
                <option value="kids">kids</option>
              </select>
            </div>
          </div>

          
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={!formData.name || !formData.price}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-8 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductModal;
