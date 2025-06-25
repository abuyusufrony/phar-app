import React, { useContext } from 'react';
import { Authcontext } from '../Authprovider/Authprovider';

import Loading from '../pages/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({ children }) => {
    const loaction = useLocation()
    console.log(loaction)
    const { users, loading } = useContext(Authcontext)
    if (loading) {
        return <Loading></Loading>
    }
    if (users && users?.displayName) {
        return children;
    }
    return <Navigate to="/login" replace state={{ from: location }} />;

};

export default PrivateRouter;