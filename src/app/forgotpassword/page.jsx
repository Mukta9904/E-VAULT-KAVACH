"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const Fpassword = () => {
  const router = useRouter()
    const [token, setToken] = useState("")
    const [successfull, setSuccessfull] = useState(false)

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    formState: { errors }
  } = useForm();
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    // If passwords match, clear the cPassword error
    if (password === confirmPassword) {
      clearErrors('cPassword');
    }
  }, [password, confirmPassword, clearErrors]);
  const onSubmit = async (data) => {
    try {
        const urlToken = new URLSearchParams(window.location.search).get('token');
        setToken(urlToken || "")
        console.log(urlToken);
        console.log(data);
        if(data.password !== data.confirmPassword){
            setError("cPassword", { type: "manual", message: "Password doesn't matches" });
    }
    else{
          let a = await fetch("http://localhost:3000/api/user/changepassword",{method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({token: token, newPassword : data.password})})
               let res = await a.json()
               console.log(res.message);
               if(res.message === "Password changed successfully"){
                console.log("changed");
                setSuccessfull(true);
                 router.replace('/login')
                }
    }
    } catch (error) {
        setError("Invalid", { type: "manual", message: "Can't change the password" });
      throw new Error(error.message)
      
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <form action={handleSubmit(onSubmit)} >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
          New Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="New password" {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength : {value: 6, message:"Min length is 6"}
          })
          } />
        {errors.password && <div className='text-sm text-red-500'>{errors.password.message}</div> }
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-new-password">
          Confirm New Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" placeholder="Confirm new password" {...register("confirmPassword", {
            required: { value: true, message: "Confirm your password" },
          })
          } />
        {errors.confirmPassword && <div className='text-sm text-red-500'>{errors.confirmPassword.message}</div> }
        {errors.cPassword && <div className='text-sm text-red-500'>{errors.cPassword.message}</div> }
        {errors.Invalid && <div className='text-sm text-red-500'>{errors.Invalid.message}</div> }
      </div>
      <div className="flex items-center justify-between">
        <button disabled={successfull} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {successfull ? "Password changed":"Change Password"}
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Fpassword
