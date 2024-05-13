"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { checkPasswordStrength } from "@/helpers/passwordStrength";
import { generateStrongPassword } from "@/helpers/passwordGenerator";
import { useRouter } from "next/navigation";
import { userContext } from "@/context/context";
import dynamic from 'next/dynamic';


function PasswordManagerForm(props) {
  const value = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    siteName: props.siteName || "",
    siteUrl: props.siteUrl || "",
    loginId: props.loginId || "",
    password: props.password || "",
  });
  const [length, setLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState(form.password);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [generate, setGenerate] = useState(false);

  useEffect(() => {
    setForm({
      siteName: props.siteName || "",
      siteUrl: props.siteUrl || "",
      loginId: props.loginId || "",
      password: props.password || "",
    });
  }, [
    props.siteName,
    props.siteUrl,
    props.loginId,
    props.password,
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  // Update password strength whenever the password changes
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  function generatePassword() {
    const newPassword = generateStrongPassword(length);
    setGeneratedPassword(newPassword);
    // Update the password strength with the new password
    setPasswordStrength(checkPasswordStrength(newPassword));
  }

  // Update the state when the range input changes
  const handleRangeChange = (event) => {
    const newLength = event.target.value;
    setLength(newLength);
    generatePassword();
  };

  // Update the generated password and its strength when the user types a password
  const handleWatch = (event) => {
    const newPassword = event.target.value;
    setGeneratedPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to submit form data
  const onSubmit = async (data) => {
    if (props.id) {
      const response = await fetch("/api/user/editpasswords", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          siteName: form.siteName,
          loginId: form.loginId,
          password: data.password,
          siteUrl: form.siteUrl,
        }),
      });
      let a = await fetch("/api/user/showpasswords", { method: "GET" });
      let res = await a.json();
      value.setUser(res.data);
      value.show && value.setShow(!value.show);
      value.create && value.setCreate(!value.create);
      return;
    }
    const response = await fetch("/api/user/addPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let a = await fetch("/api/user/showpasswords", { method: "GET" });
    let res = await a.json();
    value.setUser(res.data);
    value.show && value.setShow(!value.show);
    value.create && value.setCreate(!value.create);
  };

  // Determine the color of the password strength bar
  const strengthColor = {
    Weak: "bg-red-500",
    Moderate: "bg-yellow-500",
    Strong: "bg-green-500",
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex lg:w-[550px] w-full my-3 sticky top-20 mx-3 transition-all  rounded-[60px] bg-[#f2eae5e6]  h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-[60px] shadow-xl w-full max-w-2xl"
      >
        <div className="flex justify-center items-center">
          <h2 className="text-gray-700 font-semibold w-full text-center text-xl py-3">
            {props.heading === "Edit" ? "Edit Password" : "Save New Password"}
          </h2>
          <button
            className={`bg-white  border-2 box-border border-[#FD7401] hover:bg-[#FD7401] hover:text-white text-[#FD7401] font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline ${
              value && value.show ? "inline-block" : "hidden"
            }`}
            onClick={() => {
              value && value.setShow(false);
            }}
          >
            Close
          </button>
        </div>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Site Name
          </label>
          <input
            name="siteName"
            {...register("siteName", {
              required: { value: true, message: "This is required" },
            })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name of the website"
            value={form.siteName}
            onChange={handleChange}
          />
          {errors.siteName && (
            <div className="text-sm text-red-500">
              {errors.siteName.message}
            </div>
          )}
        </div>
        <div className="mb-4 relative ">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Login ID
          </label>
          <input
            name="loginId"
            {...register("loginId", {
              required: { value: true, message: "This is required" },
            })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="alex@gmail.com"
            value={form.loginId}
            onChange={handleChange}
          />
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={value && value.show ? "h-6 w-6 absolute z-10 top-9 hover:scale-110 right-1 hover:cursor-pointer" : "hidden"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth={2}
            onClick={() => {handleCopy(form.loginId)}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          {errors.loginId && (
            <div className="text-sm text-red-500">{errors.loginId.message}</div>
          )}
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="flex gap-2 relative">
            <input
              {...register("password", {
                required: { value: true, message: "This is required" },
                minLength: { value: 8, message: "Min length is 8" },
              })}
              type={showPassword ? "text" : "password"}
              onChange={handleWatch}
              value={generatedPassword}
              className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******"
            />
            <div onClick={() => {setShowPassword(!showPassword)}} className="h-6 w-6 absolute z-10 top-2 right-[47px] hover:cursor-pointer">
              <img src={showPassword ? "/hide.png" : "/show.png"} alt="" />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={value && value.show ? "h-6 w-6 absolute z-10 top-2 right-[75px] hover:scale-110  hover:cursor-pointer" : "hidden"}
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={2}
              onClick={() => {handleCopy(generatedPassword)}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <img
              src="/generate.png"
              onClick={() => {
                setGenerate(!generate), generatePassword();
              }}
              className="w-8 h-8 cursor-pointer hover:rotate-180"
              alt=""
            />
          </div>
          {errors.password && (
            <div className="text-sm text-red-500">
              {errors.password.message}
            </div>
          )}
          <div
            className={`h-1  ${strengthColor[passwordStrength]} rounded-full my-1`}
          ></div>
          <div className="text-black text-md font-semibold">
            {passwordStrength}
          </div>
        </div>
        <div className={generate ? "flex flex-col gap-1 text-black" : "hidden"}>
          <span className="text-gray-700">Password length : {length}</span>
          <input
            type="range"
            onChange={handleRangeChange}
            min={8} // Set the minimum value to 8
            max={50} // Example: Set the maximum value to 20
            value={length}
            className=" accent-blue-500" // Tailwind CSS classes
            name="length"
            id="length"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Site URL
          </label>
          <input
            name="siteUrl"
            {...register("siteUrl", {
              required: { value: true, message: "This is required" },
            })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="www.xyz.com"
            value={form.siteUrl}
            onChange={handleChange}
          />
          {errors.siteUrl && (
            <div className="text-sm text-red-500">{errors.siteUrl.message}</div>
          )}
        </div>
        <div className="flex items-center gap-2 justify-center">
          <button
            type="submit"
            className="bg-white  border-2 box-border border-[#FD7401] hover:bg-[#FD7401] hover:text-white text-[#FD7401] font-bold py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordManagerForm;
