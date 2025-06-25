import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Authcontext } from '../Authprovider/Authprovider';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const Reg = () => {
    const [success, setSuccess] = useState("")


    const { createuser, setuser } = useContext(Authcontext)
    const nav = useNavigate()

    const adduser = (e) => {
        e.preventDefault();
        const fom = event.target;

        const nam = fom.name.value;
        const pass = fom.password.value;
        const mail = fom.mail.value;
        const id = fom.id.value;
        const user = { nam, pass, mail, id }
        console.log(user)
        setSuccess("");
        createuser(mail, pass)
            .then((res) => {
                const user = res.user;
                setuser(user)
                console.log(user)
                return updateProfile(user, {
                    displayName: nam,
                }).then(() => {
                    toast.success(`${nam}  created successfully! ✅ `);
                    nav('/semidetails')
                });
            })
            .catch((error) => {
                const errorcode = error.code;
                const errormessage = error.message;
                console.log(errorcode, errormessage)
            })






    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-orange-500text-orange-500 mb-6">Sign Up</h2>
                {/* ✅ Success Message */}
                {success && (
                    <p className="text-green-600 text-sm text-center mb-4">{success}</p>
                )}
                <form onSubmit={adduser} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name='name'
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-gray-700 mb-1">
                            Student ID
                        </label>
                        <input
                            id="studentId"
                            name='id'
                            type="text"
                            placeholder="Enter your student ID"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="mail"
                            name='mail'
                            type="text"
                            placeholder="Enter your mail"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name='password'
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg text-white cursor-pointer"
                        style={{ backgroundColor: "#FF7F00" }}
                    >
                        Sign Up
                    </button>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-orange-500 hover:underline font-medium transition duration-200"
                        >
                            Login
                        </Link>
                    </p>


                </form>
            </div>
        </div>

    );
};

export default Reg;