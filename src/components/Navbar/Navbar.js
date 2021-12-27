import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../images/xpeedstudio_logo_header.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleClick = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen md:flex">
      {/* <!-- mobile menu bar --> */}
      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        {/* <!-- logo --> */}
        <a href="/" className="block p-4 text-white font-bold">
          <img width="100" src={logo} alt="logo" />
        </a>

        {/* <!-- mobile menu button --> */}
        <button
          onClick={toggleClick}
          className={
            isOpen
              ? "mobile-menu-button p-5 focus:outline-none focus:bg-gray-700 transition ease-in-out delay-1000"
              : "mobile-menu-button p-5 focus:outline-none focus:bg-gray-700 transition ease-in-out delay-1000"
          }
        >
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition ease-in-out delay-1000"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition ease-in-out delay-1000"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>
      {/* 
  <!-- sidebar --> */}
      <div
        className={`sidebar bg-zinc-400 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          !isOpen ? "-translate-x-full" : "-translate-x-0"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        {/* <!-- logo --> */}
        <Link to="/" className="text-white flex items-center space-x-2 px-4">
          <img width="200" src={logo} alt="logo" />
        </Link>

        {/* <!-- nav --> */}
        <nav>
          <Link
            to="/"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/getform"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-700 hover:text-white"
          >
            Get Form
          </Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
