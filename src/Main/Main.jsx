import React from 'react';
import Home from '../Componets/Home/Home';
import Reg from '../pages/Reg';
import Nav from '../Componets/Nav/Nav';
import { Outlet } from 'react-router';
import Footer from '../Componets/Footer/Footer';


const Main = () => {
    return (
        <div className='bg-[#faf9fb]'>
            <Nav></Nav>
            <Outlet></Outlet>



        </div>
    );
};

export default Main;