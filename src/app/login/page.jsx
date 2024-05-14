"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import Image from "next/image";
// import loginbg from "/public/loginbg.png"

const Login = () => {
  const [successful, setsuccessful] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let a = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (
        res.message === "Email doesn't exist" ||
        res.message === "Incorrect password"
      ) {
        setError("invalid", {
          type: "manual",
          message: "Invalid email or password",
        });
        setTimeout(() => clearErrors("invalid"), 3000);
      } else {
        setsuccessful(true);
        router.replace("/profile");
        // Clear all errors if the submission is successful
        clearErrors();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
  
    <div className="flex justify-center items-center w-full h-[100vh] bg-gradient-to-r from-blue-900 to-blue-000">
      <div className="flex bg-[#fcfcfc] border-2 border-white outline-[2px] outline-offset-[13px] outline outline-white justify-center items-center shadow-xl rounded-xl p-3 w-[75vw] h-[70vh]">
        <div className="h-full flex items-center w-full md:w-1/2 justify-center ">
          <div className=" p-5 w-full max-w-sm flex flex-col flex-wrap gap-2 ">
            <div className="flex flex-col flex-wrap justify-center items-center gap-3">
              <div className="flex items-center justify-center gap-2">
                <img
                  src="/logo.png"
                  className="w-10 h-10  border-2 border-black object-cover rounded-full"
                  alt="KAVACH Logo"
                />
                <span className="text-3xl text-[#1E2772] font-bold">
                  KAVACH
                </span>
              </div>
              <p className="text-md font-bold text-[#1E2772] mb-8">
                Login to your account.
              </p>
            </div>
            <form action={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className=" W-full flex justify-center p-1 items-center">
                <input
                  className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  id="email"
                  type="text"
                  placeholder="alex@gmail.com"
                  {...register("email", {
                    required: { value: true, message: "This is required" },
                    minLength: { value: 3, message: "Min length is 3" },
                  })}
                />
                
                <div className="p-2 2 w-[40px] h-[38px] flex justify-center items-center rounded-sm bg-[#1E2772]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_6_1284)">
                        <path
                          d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_1284">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                     </div>
                     </div>
                    
                {errors.email && (
                  <div className="text-sm text-red-500">
                    {errors.email.message}
                  </div>
                )}

              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className=" W-full flex relative justify-center p-1 items-center">
                  <input
                    className=" appearance-none border rounded w-full py-2 px-3 bg-[#F1F3F6] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: { value: true, message: "This is required" },
                      minLength: { value: 6, message: "Min length is 6" },
                    })}
                  />
                  <div onClick={() => {setShowPassword(!showPassword)}} className="h-6 w-6 absolute z-10 top-2 right-[50px] hover:cursor-pointer">
              <img src={showPassword ? "/hide.png" : "/show.png"} alt="" />
            </div>
                  <div className="p-2 mb-[12px] w-[40px] h-[38px] flex justify-center items-center rounded-sm bg-[#1E2772]">
                    
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_6_1293)">
                        <path
                          d="M19 10H20C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H5V9C5 8.08075 5.18106 7.1705 5.53284 6.32122C5.88463 5.47194 6.40024 4.70026 7.05025 4.05025C7.70026 3.40024 8.47194 2.88463 9.32122 2.53284C10.1705 2.18106 11.0807 2 12 2C12.9193 2 13.8295 2.18106 14.6788 2.53284C15.5281 2.88463 16.2997 3.40024 16.9497 4.05025C17.5998 4.70026 18.1154 5.47194 18.4672 6.32122C18.8189 7.1705 19 8.08075 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 7.67392 16.4732 6.40215 15.5355 5.46447C14.5979 4.52678 13.3261 4 12 4C10.6739 4 9.40215 4.52678 8.46447 5.46447C7.52678 6.40215 7 7.67392 7 9V10H17Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_1293">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <div className="text-sm text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end">
                <div className="text-blue-500 hover:underline mb-2  cursor-pointer">
                  <Link href="/forgotEmail">Forgot Password?</Link>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-[#1E2772] w-full hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="Submit"
                >
                  Login Now
                </button>
              </div>
              {errors.invalid && (
                <div className="text-sm text-red-500">
                  {errors.invalid.message}
                </div>
              )}
            </form>
            <div>
              <svg
                className="w-full"
                height="21"
                viewBox="0 0 410 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="4.37114e-08"
                  y1="10.5"
                  x2="175"
                  y2="10.5"
                  stroke="#C2C2C2"
                />
                <line x1="235" y1="10.5" x2="410" y2="10.5" stroke="#C2C2C2" />
                <path
                  d="M200.502 15.098C199.597 15.098 198.771 14.888 198.024 14.468C197.277 14.0387 196.685 13.446 196.246 12.69C195.817 11.9247 195.602 11.066 195.602 10.114C195.602 9.162 195.817 8.308 196.246 7.552C196.685 6.78667 197.277 6.194 198.024 5.774C198.771 5.34467 199.597 5.13 200.502 5.13C201.417 5.13 202.247 5.34467 202.994 5.774C203.741 6.194 204.329 6.782 204.758 7.538C205.187 8.294 205.402 9.15267 205.402 10.114C205.402 11.0753 205.187 11.934 204.758 12.69C204.329 13.446 203.741 14.0387 202.994 14.468C202.247 14.888 201.417 15.098 200.502 15.098ZM200.502 13.992C201.183 13.992 201.795 13.8333 202.336 13.516C202.887 13.1987 203.316 12.746 203.624 12.158C203.941 11.57 204.1 10.8887 204.1 10.114C204.1 9.33 203.941 8.64867 203.624 8.07C203.316 7.482 202.891 7.02933 202.35 6.712C201.809 6.39467 201.193 6.236 200.502 6.236C199.811 6.236 199.195 6.39467 198.654 6.712C198.113 7.02933 197.683 7.482 197.366 8.07C197.058 8.64867 196.904 9.33 196.904 10.114C196.904 10.8887 197.058 11.57 197.366 12.158C197.683 12.746 198.113 13.1987 198.654 13.516C199.205 13.8333 199.821 13.992 200.502 13.992ZM212.222 15L209.898 11.01H208.358V15H207.084V5.242H210.234C210.971 5.242 211.592 5.368 212.096 5.62C212.609 5.872 212.992 6.21267 213.244 6.642C213.496 7.07133 213.622 7.56133 213.622 8.112C213.622 8.784 213.426 9.37667 213.034 9.89C212.651 10.4033 212.073 10.744 211.298 10.912L213.748 15H212.222ZM208.358 9.988H210.234C210.925 9.988 211.443 9.82 211.788 9.484C212.133 9.13867 212.306 8.68133 212.306 8.112C212.306 7.53333 212.133 7.08533 211.788 6.768C211.452 6.45067 210.934 6.292 210.234 6.292H208.358V9.988Z"
                  fill="#C2C2C2"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <Link className="w-full" href="/signup">
                <button
                  className="bg-white w-full border-2 box-border border-[#1E2772] hover:bg-[#1E2772] hover:text-white text-[#1E2772] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full hidden md:flex justify-center items-center">
          <img className="w-full h-full" src="/loginbg2.png" alt="Login Background" />
        </div>
      </div>
    </div>
  );
};

export default Login;
