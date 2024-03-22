import React, { useState, useEffect } from "react";
import { LogoutBtn } from "../index";

import ThemeBtn from "../themebtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "../../contexts/theme";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState("light");
  const LightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <ThemeProvider value={{ themeMode, darkTheme, LightTheme }}>
      <nav className="bg-slate-300 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-400 dark:border-gray-600">
        <div className="bg-slate-300 dark:bg-gray-900 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="bg-slate-300 dark:bg-gray-900 flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white dark:bg-gray-900">
              BlogWrite
            </span>
          </a>

          <button
            type="button"
            onClick={toggleMobileMenu} // Add onClick event handler here
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`dark:bg-gray-900 items-center justify-between w-full md:flex md:flex-shrink md:w-auto md:order-1 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ThemeBtn />
            <ul className="font-medium bg-slate-300 text-white flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="shadow-md m-2 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      aria-current="page"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="flex m-2 w-full sm:w-auto md:w-auto md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>

         
        </div>
      </nav>
    </ThemeProvider>
  );
}

export default Header;
