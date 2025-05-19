import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './globalStyle.tsx'

createRoot(document.getElementById('root')!).render(
  <div>
    <App />
    <GlobalStyle />
  </div>
)
