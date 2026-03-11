
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CreatorPage from "./pages/CreatorPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage"
import NotFoundPage from "./pages/NotFoundPage"
import Private from "./components/Private";
import PrivateCreator from "./components/PrivateCreator";
import { useState } from "react";
import { useEffect } from "react";
import service from "./services/config.services";


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await service.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);
  return (
    <>
     <Routes>
       <Route path="/" element={<HomePage products={products}/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/products" element={<ProductPage products={products}/>}/>
       <Route path="/products/:productId" element={<Private><ProductDetailsPage products={products}/></Private>}/>
       <Route path="/creator" element={<PrivateCreator><CreatorPage products={products} setProducts={setProducts} /></PrivateCreator>}/>
       <Route path="/cart" element={<Private><CartPage/></Private>}/>
       <Route path="*" element={<NotFoundPage/>}/>
     </Routes>
      
    </>
  )
}

export default App
