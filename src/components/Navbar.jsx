import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
// Note: This path assumes the 'provider' folder is a sibling to the folder containing this component.
// Adjust '../provider/AuthProvider' if your folder structure is different.
import { AuthContext } from '../provider/AuthProvider';

// --- Helper Icon Components ---
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

// --- Main Navbar Component ---
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogOut = () => {
    logOut();
  };

  // This function ensures only one link is active at a time
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-sm"
      : "text-gray-600 dark:text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700 transition-colors duration-300";

  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/available-foods" className={navLinkClass}>Available Foods</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-food" className={navLinkClass}>Add Food</NavLink></li>
          <li><NavLink to="/manage-foods" className={navLinkClass}>Manage My Foods</NavLink></li>
          <li><NavLink to="/my-requests" className={navLinkClass}>My Food Requests</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text">
              FoodShare
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <ul className="flex items-center space-x-2">
              {navLinks}
            </ul>
          </div>

          {/* Right Side Actions: Theme Toggle & Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            {user ? (
              <div className="relative group">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=22C55E&color=fff`}
                  alt={user.displayName}
                  className="h-10 w-10 rounded-full object-cover cursor-pointer ring-2 ring-offset-2 ring-green-500"
                />
                <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white truncate">{user.displayName}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="text-gray-600 dark:text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-green-500 text-white font-bold px-5 py-2 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <ul className="flex flex-col space-y-1">
            {navLinks}
            {!user && (
              <>
                <li className="pt-2"><Link to="/login" className="block w-full text-center text-gray-700 dark:text-gray-200 font-medium px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">Sign In</Link></li>
                <li><Link to="/signup" className="block w-full text-center bg-green-500 text-white font-bold px-4 py-2 rounded-lg">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

