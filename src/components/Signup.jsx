import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef } from "react";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // use watch to get value of input fields
  const password = useRef({});
  password.current = watch("password", "");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-28 pb-16 bg-white dark:bg-gray-900 border-gray-900 dark:border-gray-700">
      <div className="flex-shrink m-auto max-w-lg p-5  ">
        <div className="border border-gray-400 rounded-lg p-10 bg-slate-300 dark:bg-gray-800 shadow-xl">
          <form
            onSubmit={handleSubmit(create)}
            className="max-w-sm mx-auto bg-slate-300 dark:bg-gray-800"
          >
            <label
              for="email"
              className="flex justify-center mb-2 text-5xl font-medium text-gray-900 dark:text-white"
            >
              Signup
            </label>
            <p className="m-2 text-center text-base dark:text-white opacity-70">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="underline font-medium text-primary transition-all duration-200 hover:underline"
              >
                Login
              </Link>
            </p>
            {error && (
              <p className="text-white mt-4 first-letter text-center bg-red-600 rounded-md p-2 mb-2">
                {error}
              </p>
            )}
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                label="password"
                placeholder="John Davis"
                className="dark:bg-slate-200 bg-white   border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>

              <input
                type="email"
                id="email"
                className="dark:bg-slate-200 bg-white   border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@BlogWrite.com"
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
                for="password"
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
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="***********"
                className="dark:bg-slate-200 bg-white   border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password.current || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-white mt-2 first-letter text-center bg-red-600 rounded-md p-1 mb-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div class="flex mb-4">
              <input
                type="checkbox"
                class="shrink-0 ml-1 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                id="hs-default-checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label
                for="hs-default-checkbox"
                class="text-sm text-gray-500 ms-2 mt-0 dark:text-gray-400"
              >
                Show Password
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
