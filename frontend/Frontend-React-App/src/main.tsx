import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider} from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import  theme  from './theme.ts'

document.documentElement.setAttribute('data-theme', 'dark');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
