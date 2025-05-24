import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './pages/login.css'
import './pages/signup.css'
import './pages/MainPage.css'
import './pages/common.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  
  
) 