"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import PasswordManagerForm from "../saveForm/page";
import { userContext } from "@/context/context";

const Passwords = () => {
  const [user, setUser] = useState([]);
  const [showUser, setshowUser] = useState({});
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let a = await fetch("/api/user/showpasswords", { method: "GET" });
      let res = await a.json();
      setUser(res.data)
    }
    fetchData();
  }, []);

  const handleShow = (obj) => {
    console.log(obj._id || obj.id);
    setshowUser(obj);
    setShow(!show);
    setCreate(false);
  };
  const handleDelete = async (obj) => {
    console.log(obj);
    let a = await fetch("/api/user/deletepassword", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: obj._id ? obj._id : obj.id }),
    });
    let r = await fetch("/api/user/showpasswords", { method: "GET" });
    let res = await r.json();
    setUser(res.data)
  };
  return (
    <userContext.Provider
      value={{ user, setUser, create, setCreate, show, setShow }}
    >
      <div className=" w-full h-[100%]">
        <div className="flex p-3 sticky top-0 z-10 bg-[#EBDFD7] text-gray-700 text-2xl font-semibold justify-between items-center">
          <span>Saved Passwords</span>
          <span
            onClick={() => {
              setCreate(!create), setShow(false);
            }}
            className=" cursor-pointer "
          >
            <img src="/create.svg" alt="" />
          </span>
        </div>
        <div className="flex ">
          <div
            className={`flex w-full sm:w-[80%] sm:ml-5 flex-col ${
              show || create ? "hidden md:flex" : ""
            }`}
          >
            {user &&
              user.map((user) => {
                return (
                  <div
                    onClick={(e) => {
                      handleShow(user), e.stopPropagation();
                    }}
                    key={user._id || user.id}
                    className={`cursor-pointer transition-all duration-300 hover:bg-[#eac7a3] hover:scale-[1.02] flex items-center justify-between bg-[#f2eae5e6] py-2 px-6 rounded-[40px] shadow-md m-3 ${
                      show || create ? "hidden md:flex" : ""
                    } `}
                  >
                    <div className="w-full">
                      <h2 className="text-black text-lg font-semibold mb-2">
                        {user.siteName}
                      </h2>
                      <div className="w-[98%]  h-[1px] opacity-40 bg-black"></div>
                      <p className="mb-2">
                        <span className="text-black ">{user.siteUrl}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <img
                        src="/edit.svg"
                        onClick={() => {
                          setShow(!show);
                        }}
                        className=" hover:border hover:border-black rounded-lg cursor-pointer"
                        alt=""
                      />
                      <img
                        src="/delete.svg"
                        onClick={(e) => {
                          handleDelete(user), e.stopPropagation();
                        }}
                        className=" hover:border hover:border-black rounded-lg cursor-pointer"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          {create && (
            <PasswordManagerForm className="absolute w-[600px] top-10 transition-all right-[20px] " />
          )}
          {show && (
            <PasswordManagerForm
              id={showUser._id || showUser.id}
              siteName={showUser.siteName}
              siteUrl={showUser.siteUrl}
              loginId={showUser.loginId}
              password={showUser.password}
              heading="Edit"
              className="absolute w-[600px] transition-all right-[20px]"
            />
          )}
        </div>
      </div>
    </userContext.Provider>
  );
};

export default Passwords;
