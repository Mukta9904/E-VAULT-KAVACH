"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect,useState } from 'react'

const Navbar = () => {
    const [user, setuser] = useState({})
    const router = useRouter()
    useEffect(() => {
      async function fetchData() {
        let a = await fetch("/api/user/profile", { method: "GET" });
        let res = await a.json();
        // Check if the user data is not present, then redirect to login
        if (!res.data) {
          router.replace("/login");
        } else {
          setuser(res.data);
        }
      }
      fetchData();
    }, []);
    
      const handleLogout = async ()=>{
          let a = await fetch("/api/user/logout", {method:"GET"}) 
          let res = await a.json()
          console.log(res.message);
          if(res.message === "Logout successful"){
              router.replace("/login")
          }
      }
  return (
    <div>
      <nav className='bg-[#EBDFD7] flex justify-between items-center  text-gray-700 font-bold px-5 py-2'>
        <h1 className='text-2xl hidden md:inline-block'>Dashboard</h1>
        <ul className='flex justify-end items-center gap-3 sm:px-4 '>
            <li className='bg-white rounded-full w-[190px] sm:w-[300px] px-4 overflow-hidden py-3  text-center text-gray-700 text-sm'><span>{user && user.email}</span></li>
            <li> <button className="bg-white  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={handleLogout}>
       <img src="/logout.png" className='w-6 h-6' alt="" />
      </button>
      </li>
        </ul>
    </nav>
    <div className="w-[100%] h-[1px] bg-gray-600 opacity-20"></div>
    </div>
  )
}

export default Navbar
