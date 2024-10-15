import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>      {/* so we can use any other components coming from this pkg react-router-dom */}
      <ChakraProvider>
        <App />          {/* App.jsx */}
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
