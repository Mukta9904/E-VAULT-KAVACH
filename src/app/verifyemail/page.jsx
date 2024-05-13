"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Verify = () => {
  const [verify, setVerify] = useState(false)
  const [token, setToken] = useState("")
  const router =  useRouter()
  
 const handleVerify = async ()=>{
  // const {query} = router
  // const urlToken = query.token
  // setToken(urlToken || "no token")

  const urlToken = new URLSearchParams(window.location.search).get('token');
  setToken(urlToken || "")
  console.log(urlToken);
  try {
    let a = await fetch("http://localhost:3000/api/user/verifyEmail",{method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({"token": token})})
    let res = await a.json()
     console.log(res);
      if(res.message === "User verified successfully"){
        setVerify(true)
      }
    } catch (error) {
      throw new Error(error)
    }
    
  
 }
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
    <h3 className="text-lg font-semibold mb-4 text-black">Verify Your Email</h3>
    <p className="text-sm mb-4 text-black">Click the button below to verify your email address and activate your account.</p>

    <button onClick={handleVerify}  disabled={verify} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      {verify ? "Verified" : "Verify Email"}
    </button>
  </div>
    </div>
  )
}

export default Verify
