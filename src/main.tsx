import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routerconfig from './router-config.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routerconfig); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
