import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import AppRoute from "./pages/routes/AppRoute.jsx"
import App from "./App.jsx"
import { AuthProvider } from './context/AuthContext.jsx'
import { APIProvider } from "@vis.gl/react-google-maps";
import "./i18n/i18n";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    {/* <AppRoute/> */}
    <AuthProvider>
      <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <LanguageProvider>
        <App/>
      </LanguageProvider>
    </APIProvider>
      
    </AuthProvider>
  </StrictMode>
  </BrowserRouter>,
)
