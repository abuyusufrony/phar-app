import React, { useContext } from 'react';
import { Authcontext } from '../../Authprovider/Authprovider';
import { FiLogOut, FiLogIn, FiUser } from 'react-icons/fi';
import { Link } from 'react-router';

const Nav = () => {
    const { users, handleLogout } = useContext(Authcontext)

    return (
        <div className="flex items-center justify-between px-6 h-16 bg-white shadow-md rounded-xl">
            <div className="flex items-center gap-2">
                <FiUser className="text-orange-500 text-xl" />
                <p className="font-medium text-gray-700">
                    {users ? users.displayName || "User" : "Guest"}
                </p>
            </div>

            <div>
                {users && users.displayName ? (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                    >
                        <FiLogOut className="text-lg" />
                        <span>Logout</span>
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
                    >
                        <FiLogIn className="text-lg" />
                        <span>Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Nav;