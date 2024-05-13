"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const pathname = usePathname();
  const [password, setPassword] = useState(false);
  const [payments, setPayments] = useState(false);
  // Function to check if the path is active
  useEffect(() => {
    setPassword(pathname === "/profile");
    setPayments(pathname === "/profile/payments");
  }, [pathname]);

  return (
    <div className=" w-[100px] md:min-w-[210px]  bg-[#191919] relative h-full ">
      <img src="/dash.svg" className=" absolute top-4 right-[-20px]" alt="" />
      <div className="mb-6 md:mb-0 p-4 pl-6 pt-6 bg-[#191919]">
        <div className="flex  items-center gap-2">
          <img
            src="/logo.png"
            className="w-10 h-10  border-2 border-black object-cover rounded-full"
            alt="KAVACH Logo"
          />
          <span className="text-xl text-white font-bold hidden md:inline-block">
            KAVACH
          </span>
        </div>
      </div>
      <ul className=" md:pl-5 pt-[50px] flex flex-col items-start px-2 py-3 text-white text-xl gap-3 bg-[#191919] p-2">
        <li
          className={
            password
              ? "rounded-full py-2 px-4 bg-white text-orange-500 "
              : "py-2 px-4"
          }
        >
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2"
          >
            <span>
              <img src="/password.svg" className="pb-1" alt="" />
            </span>
            <span className="hidden md:inline-block">Passwords</span>
          </Link>
        </li>
        <li
          className={
            payments
              ? "rounded-full py-2 px-4 bg-white text-orange-500"
              : "py-2 px-4"
          }
        >
          <Link
            href="/profile/payments"
            className="flex items-center justify-center gap-2 pl-1"
          >
            <span>
              <img src="/payment.svg" alt="" />
            </span>
            <span className="hidden md:inline-block">Payments</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
