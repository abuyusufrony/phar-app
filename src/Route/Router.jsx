import React from 'react';
import { createBrowserRouter } from 'react-router';
import Main from '../Main/Main';
import Login from '../pages/Login';
import Reg from '../pages/Reg';


const Router = createBrowserRouter([{
    path: '/',
    element: <Main></Main>
},
{
    path: '/login',
    element: <Login></Login>
},
{
    path: '/reg',
    element: <Reg></Reg>
}


])




export default Router;