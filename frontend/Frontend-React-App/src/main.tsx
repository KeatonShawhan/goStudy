import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import  theme  from './theme.ts'

useEffect(() => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);

}, [])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="dark"/>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
