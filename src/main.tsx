import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import GlobalStyle from './globalStyle.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <div>
    <App />
    <GlobalStyle />
  </div>
  // </StrictMode>
)
