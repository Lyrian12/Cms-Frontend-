import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './cms.css'
import App from './CmsApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
