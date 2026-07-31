import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './app/router.jsx'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './Context/userContext.jsx'
import AuthInitializer from './Components/AuthInitializer.jsx'
import { getUserData } from './Context/userContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <AuthInitializer/>
    <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)
