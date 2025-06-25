import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Authcontext } from '../Authprovider/Authprovider';
import { toast } from 'react-toastify';


const Login = () => {
    const { handlelogin } = useContext(Authcontext)
    const loaction = useLocation()
    const navigate = useNavigate()
    console.log(loaction)
    const loginuser = (e) => {
        e.preventDefault();
        const fom = event.target;
        const id = fom.sid.value;
        const pass = fom.password.value;
        const user = { id, pass }
        console.log(user)
        handlelogin(id, pass)
            .then((res) => {
                const user = res.user
                toast.success(`🎉 Welcome, ${user.displayName || 'User'}!`);
                navigate('/semidetails');

            })
            .catch((error) => {
                alert(error.code)
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">Login</h2>
                <form onSubmit={loginuser} className="space-y-4">
                    <div>
                        <label htmlFor="studentId" className="block text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="studentId"
                            type="text"
                            name='sid'
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name='password'
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg text-white cursor-pointer"
                        style={{ backgroundColor: "#FF7F00" }}
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link
                        to="/reg"
                        className="text-orange-500 hover:underline font-medium transition duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;