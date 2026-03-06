import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(

    <AuthWrapper>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AuthWrapper>
)