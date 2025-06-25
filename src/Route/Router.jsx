import React from 'react';
import { createBrowserRouter } from 'react-router';
import Main from '../Main/Main';
import Login from '../pages/Login';
import Reg from '../pages/Reg';
import Home from '../Componets/Home/Home';
import SemistarDetails from '../Componets/SemisterDetails/SemistarDetails';
import PrivateRouter from './PrivateRouter';


const Router = createBrowserRouter([{
    path: '/',
    element: <Main></Main>,

    children: [{
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/reg',
        element: <Reg></Reg>
    },
    {
        path: '/semidetails',
        element: <PrivateRouter>
            <SemistarDetails></SemistarDetails>
        </PrivateRouter>
    }

    ]
},





])




export default Router;