import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartWrapper } from './context/cart.context.jsx';

createRoot(document.getElementById('root')).render(

    <AuthWrapper>
      <BrowserRouter>
        <CartWrapper>
        <App/>
        </CartWrapper>
      </BrowserRouter>
    </AuthWrapper>
)