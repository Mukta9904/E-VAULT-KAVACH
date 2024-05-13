
"use client"
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

const Femail = () => {
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
      let response = await fetch("http://localhost:3000/api/user/forgotemail", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      let res = await response.json();
      console.log(res.message);
      if(res.message === "Invalid email"){
        setError("email", { type: "manual", message: "Email doesn't exists" });
      } else {
        console.log("send");
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
      alert("Email sent, please change your password");
      setSuccessfull(false);
    }
  }, [successfull])
  
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <form action={handleSubmit(onSubmit)} >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" {...register("email", {
            required: { value: true, message: "Email is required" },
          })
          } />
          {errors.email && <div className='text-sm text-red-500'>{errors.email.message}</div> }
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {loading ? 'Sending...' : 'Send Reset Link'} {/* Change button text based on loading status */}
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Femail
