
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CreatorPage from "./pages/CreatorPage";
import CartPage from "./pages/CartPage";
function App() {

  return (
    <>
     <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/productes" element={<ProductPage/>}/>
       <Route path="/products/:productId" element={<ProductDetailsPage/>}/>
       <Route path="/creator/:userId" element={<CreatorPage/>}/>
       <Route path="/cart/:userId" element={<CartPage/>}/>
       <Route path="*" element={<NotFoundPage/>}/>
     </Routes>
      
    </>
  )
}

export default App
