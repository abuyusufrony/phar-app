import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import Router from './Route/Router.jsx'
import Authprovider from './Authprovider/Authprovider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={Router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        theme="light"
      />
    </Authprovider>
  </StrictMode>,
)
