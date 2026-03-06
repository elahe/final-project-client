
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
function App() {

  return (
    <>
     <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/productes" element={<ProductPage/>}/>
       <Route path="/products/:productId" element={<Private><ProductDetailsPage/></Private>}/>
       <Route path="/creator/:userId" element={<PrivateCreator><CreatorPage/></PrivateCreator>}/>
       <Route path="/cart/:userId" element={<Private><CartPage/></Private>}/>
       <Route path="*" element={<NotFoundPage/>}/>
     </Routes>
      
    </>
  )
}

export default App
