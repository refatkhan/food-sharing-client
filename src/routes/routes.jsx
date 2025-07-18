import React from 'react';
import { createBrowserRouter } from 'react-router'
import MainLayout from '../main/MainLayout';
import Home from '../home/Home';
import Signup from '../pages/Signup';
import AvailableFoods from '../pages/AvailableFoods';
import ManageMyFoods from '../pages/ManageMyFoods';
import AddFood from '../pages/AddFood';
import MyFoodRequest from '../pages/MyFoodRequest';
import Login from '../pages/Login';
import FoodDetails from '../pages/FoodDetails';
import UpdateFood from '../pages/UpdateFood';
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
        path: "/login",
        element: <Login />
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />
      },
      {
        path: "/add-food",
        element: <AddFood />
      },
      {
        path: "/browse-foods",
        element: <ManageMyFoods />
      },
      {
        path: "/food-request",
        element: <MyFoodRequest />
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/food/${params.id}`)
      },
      {
        path: "/update-food/:id",
        element: <UpdateFood />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/food/${params.id}`)
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