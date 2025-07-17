import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const { logOut, user } = useContext(AuthContext);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "light" ? "light" : "dark"
    );

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setTheme(savedTheme);
        document.querySelector("html").setAttribute("data-theme", savedTheme);
    }, [theme]);

    const handleThemeChange = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const handleLogOut = () => {
        logOut();
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) =>
                    isActive ? "text-white bg-green-600 px-4 py-2 rounded-lg"
                        : "text-gray-700 hover:text-white hover:bg-green-600 px-4 py-2 rounded-lg"
                }>Home</NavLink>
            </li>
            <li>
                <NavLink to="/donate-food" className={({ isActive }) =>
                    isActive ? "text-white bg-green-600 px-4 py-2 rounded-lg"
                        : "text-gray-700 hover:text-white hover:bg-green-600 px-4 py-2 rounded-lg"
                }>Donate Food</NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/my-donations" className={({ isActive }) =>
                            isActive ? "text-white bg-green-600 px-4 py-2 rounded-lg"
                                : "text-gray-700 hover:text-white hover:bg-green-600 px-4 py-2 rounded-lg"
                        }>My Donations</NavLink>
                    </li>
                    <li>
                        <NavLink to="/request-food" className={({ isActive }) =>
                            isActive ? "text-white bg-green-600 px-4 py-2 rounded-lg"
                                : "text-gray-700 hover:text-white hover:bg-green-600 px-4 py-2 rounded-lg"
                        }>Request Food</NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to="/food-requests" className={({ isActive }) =>
                    isActive ? "text-white bg-green-600 px-4 py-2 rounded-lg"
                        : "text-gray-700 hover:text-white hover:bg-green-600 px-4 py-2 rounded-lg"
                }>Browse Requests</NavLink>
            </li>
        </>
    );

    return (
        <div className="bg-white dark:bg-base-200 shadow-md sticky top-0 z-50">
            <div className="navbar w-11/12 mx-auto py-4">
                {/* Brand */}
                <div className="navbar-start">
                    <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-green-800 text-transparent bg-clip-text">
                        FoodShare
                    </Link>
                    <div className="dropdown lg:hidden ml-2">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                </div>

                {/* Center Nav */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
                </div>

                {/* End - Theme Toggle + Auth */}
                <div className="navbar-end flex items-center gap-4">
                    {/* <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="checkbox"
                            className="toggle toggle-md"
                            checked={theme === "dark"}
                            onChange={handleThemeChange}
                        />
                        <span className="text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
                    </label> */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="avatar tooltip tooltip-bottom" data-tip={user?.displayName}>
                                <div className="w-10 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                </div>
                            </div>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-sm bg-green-600 text-white hover:bg-green-700 rounded-full"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <NavLink to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-green-600 text-white px-4 py-2 rounded-lg"
                                        : "hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg"
                                }
                            >Log In</NavLink>
                            <NavLink to="/signup"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-green-600 text-white px-4 py-2 rounded-lg"
                                        : "hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg"
                                }
                            >Sign Up</NavLink>
                        </div>
                    )}
                </div>
            </div>

        </div>

    );
};

export default Navbar;
