import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './reset.css';
// import "antd/dist/antd.css"

import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactQueryDevtools } from 'react-query/devtools'

//contexts
import {AuthProvider} from "./contexts/AuthContext"
import {BasketProvider} from "./contexts/BasketContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
})
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <BasketProvider>
             <App />
          </BasketProvider>
        </AuthProvider>
      </ChakraProvider>

      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
