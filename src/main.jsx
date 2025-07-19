import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import AuthProvider from './provider/AuthProvider.jsx';
import { RouterProvider } from 'react-router';
import router from './routes/routes.jsx';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>
);
