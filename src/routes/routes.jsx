import React from 'react';
import { createBrowserRouter } from 'react-router'
import MainLayout from '../main/MainLayout';
import Home from '../home/Home';
import Signup from '../pages/Signup';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {

      },
      {

      },
      {

      },
      {

      },
      {

      },
      {

      },
      {

      },
      {

      },
      {

      },
      {

      },
    ]
  },
]);


export default router;