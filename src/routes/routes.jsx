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
import AllFood from '../components/AllFood';
import PrivateRoute from './PrivateRoute';
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
        element: (<PrivateRoute>
          <AddFood />
        </PrivateRoute>)
      },
      {
        path: "/browse-foods",
        element: (<PrivateRoute>
          <ManageMyFoods />
        </PrivateRoute>)
      },
      {
        path: "/food-request",
        element: (<PrivateRoute>
          <MyFoodRequest />
        </PrivateRoute>)
      },
      {
        path: "/food-details/:id",
        element: (<PrivateRoute>
          <FoodDetails />
        </PrivateRoute>),
        loader: ({ params }) =>
          fetch(`https:/food-server-sooty.vercel.app/food/${params.id}`)
      },
      {
        path: "/update-food/:id",
        element: (<PrivateRoute>
          <UpdateFood />
        </PrivateRoute>),
        loader: ({ params }) =>
          fetch(`https:/food-server-sooty.vercel.app/food/${params.id}`)
      },
      {
        path: "/all-food",
        element: <AllFood />
      },
      {

      },
      {

      },
      
    ]
  },
]);


export default router;