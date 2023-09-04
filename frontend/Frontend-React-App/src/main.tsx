import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript} from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import  theme  from './theme.ts'

 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="dark"/>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
