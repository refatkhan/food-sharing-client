import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import AuthProvider from './provider/AuthProvider.jsx';
import { RouterProvider } from 'react-router';
import router from './routes/routes.jsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </AuthProvider>
   
  </React.StrictMode>
);
