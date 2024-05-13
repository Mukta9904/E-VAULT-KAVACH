"use client"
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

const Signup = () => {
  const [successfull, setSuccessfull] = useState(false)
  const [loading, setLoading] = useState(false) // New state for loading status

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors }
  } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when the submission starts
    try {
      let response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      let res = await response.json();
      console.log(res.message);
      if(res.message === "User already exist"){
        setError("email", { type: "manual", message: "Email already exists" });
      } else {
        console.log("registered");
        setSuccessfull(true);
        clearErrors();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false); // Set loading to false when the submission ends
    }
  };

  useEffect(() => {
    if (successfull) {
      alert("Sign up successful");
      setSuccessfull(false);
    }
  }, [successfull])
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-000">

  <div className="bg-white rounded-2xl flex items-center gap-3 justify-between shadow-md w-[75vw] h-[68vh]">
    <div className='lg:w-1/2 w-full flex flex-col px-6 py-4  gap-2 items-center justify-center'>
    <div className="flex items-center justify-center gap-2">
                <img
                  src="/logo.png"
                  className="w-10 border-2 border-black h-10 object-cover rounded-full"
                  alt="KAVACH Logo"
                />
                <span className="text-3xl text-[#1E2772] font-bold">
                  KAVACH
                </span>
              </div>
    <h2 className="text-2xl text-[#1E2772] font-bold mb-8">Create your Account</h2>
    <form action={handleSubmit(onSubmit)} >
      <div className="mb-4">
      
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <div className=" W-full flex justify-center p-1 items-center">
        <input className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name='email' type="email" placeholder="Email" {...register("email", {
            required: { value: true, message: "Email is required" },

          })
          }/> 
          <div className="p-2 2 w-[40px] h-[38px] flex justify-center items-center rounded-sm bg-[#1E2772]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_6_1284)">
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
          {errors.email && <div className='text-sm text-red-500'>{errors.email.message}</div> }
          {errors.Email && <div className='text-sm text-red-500'>{errors.Email.message}</div> }
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <div className=" W-full flex justify-center p-1 items-center">
        <input className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='username' type="text" placeholder="Username" {...register("username", {
            required: { value: true, message: "This is required" },
            minLength: { value: 3, message: "Min length is 3" },
          })}/>
          <div className="p-2 2 w-[40px] h-[38px] flex justify-center items-center rounded-sm bg-[#1E2772]">
            <img src="/user.png" alt="" />
          </div>
          </div>
          {errors.username && <div className=' text-sm text-red-500'>{errors.username.message}</div> }
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <div className=" W-full flex justify-center p-1 items-center">
        <input className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: { value: 6, message: "Min length is 6" },
          })}/>
          <div className="p-2 mb-[12px] w-[40px] h-[38px] flex justify-center items-center rounded-sm bg-[#1E2772]">
                    
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_6_1293)">
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
           {errors.password && <div className='text-sm text-red-500'>{errors.password.message}</div> }
      </div>
      <div className="flex items-center w-full justify-center">
        <button className="bg-[#0B2F8A] hover:bg-[#11275e] text-white font-bold shadow-lg py-2 px-10 rounded-full focus:outline-none focus:shadow-outline" type="submit">
          {loading ? 'Signing Up...' : 'Sign Up'} {/* Change button text based on loading status */}
        </button>
      </div>
      <div className='text-black text-lg font-medium my-3'>Already have an account?<span className=' text-blue-700 font-semibold hover:underline'><Link href="/login">Log In</Link></span></div>
    </form>
    </div>
    <div className="w-1/2 h-full hidden lg:flex justify-center items-center">
    <img className='w-full h-full rounded-r-2xl' src="/signupbg.jpg"  alt="" />
    </div>
  </div>
</div>

    </div>
  )
}

export default Signup
