import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";

import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="mt-28 bg-white dark:bg-gray-900 border-gray-900 dark:border-gray-700">
        <div className="mb-10 flex-shrink max-w-lg p-5 mx-auto ">
          <div className="border border-gray-600 rounded-lg p-10 bg-slate-300 dark:bg-gray-800 shadow-xl">
            <form
              onSubmit={handleSubmit(login)}
              className="max-w-sm mx-auto bg-slate-300 dark:bg-gray-800"
            >
              <div className="mb-5">
                <h1 className="flex justify-center mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                  Welcome back!
                </h1>
                <h2 className="text-center mb-4 opacity-70 dark:text-slate-300">
                  {" "}
                  Log in to continue reading
                </h2>
                {error && (
                  <p className="text-white mt-4 first-letter text-center bg-red-600 rounded-md p-2 mb-2">
                    {error}
                  </p>
                )}
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="dark:bg-slate-200 bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="***********"
                  className="dark:bg-slate-200 bg-white   border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("password", {
                    required: true,
                  })}
                />

                <div class="flex mt-2">
                  <input
                    type="checkbox"
                    class="shrink-0 ml-1 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    id="hs-default-checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label
                    for="hs-default-checkbox"
                    class="text-sm text-gray-500 ms-3 dark:text-gray-400"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <div className="text-slate-900 dark:text-slate-200 opacity-80 mt-5 text-center">
                Don&apos;t have any account?&nbsp;
                <Link
                  to="/signup"
                  className="underline font-medium text-primary transition-all duration-200 hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
