"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { paymentContext } from "@/context/context";
import { useContext } from "react";
import { Dropdown } from "../Dropdown/page";
const PaymentForm = (props) => {
  const value = useContext(paymentContext);
  const [form, setForm] = useState({
    cardTitle: props.cardTitle || "",
    cardNumber: props.cardNumber || "",
    expiryMonth: props.expiryMonth || "",
    expiryYear: props.expiryYear || "",
    cvv: props.cvv || "",
    cardHolderName: props.cardHolderName || "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(form);
    if (props.id) {
      const response = await fetch("/api/user/editPayment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          cardTitle: data.cardTitle,
          cardNumber: form.cardNumber,
          expiryMonth: form.expiryMonth,
          expiryYear: form.expiryYear,
          cvv: form.cvv,
          cardHolderName: form.cardHolderName,
        }),
      });
      const res = await response.json();
      let a = await fetch("/api/user/showPayments", { method: "GET" });
      let r = await a.json();
      value.setPayments(r.data);
      value.show && value.setShow(!value.show)
      value.create && value.setCreate(!value.create)
      return;
    }
    const response = await fetch("/api/user/addPayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const res = await response.json();
    let a = await fetch("/api/user/showPayments", { method: "GET" });
    let r = await a.json();
    value.setPayments(r.data);
    value.show && value.setShow(!value.show)
      value.create && value.setCreate(!value.create)
  };
 

  useEffect(() => {
    setForm({
      cardTitle: props.cardTitle || "",
      cardNumber: props.cardNumber || "",
      expiryMonth: props.expiryMonth || "",
      expiryYear: props.expiryYear || "",
      cvv: props.cvv || "",
      cardHolderName: props.cardHolderName || "",
    });
  }, [
    props.cardTitle,
    props.cardNumber,
    props.expiryMonth,
    props.expiryYear,
    props.cvv,
    props.cardHolderName,
  ]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, "0")
  );
  const years = Array.from({ length: 12 }, (_, index) => (currentYear + index).toString());
  return (
    <div className="flex lg:w-[550px] w-full sticky top-20 my-3 mx-3 transition-all rounded-[60px] bg-[#f2eae5e6]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-[60px] shadow-xl w-full max-w-2xl"
      >  <div className="flex justify-between items-center">

        <h2 className="text-gray-700 font-semibold w-full text-center text-xl py-3">
          {props.heading === "Edit"
            ? "Edit Payment Details"
            : "Enter Payment Details"}
        </h2>
        <button
            className={`bg-white  border-2 box-border border-[#FD7401] hover:bg-[#FD7401] hover:text-white text-[#FD7401] font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline ${
              value.show ? "inline-block" : "hidden"
            }`}
            onClick={() => {
              value.setShow(false);
            }}
          >
            Close
          </button>
              </div>
        {/* Card Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Title
          </label>
          <input
            name="cardTitle"
            {...register("cardTitle", { required: "Card title is required" })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="My Debit Card"
            onChange={handleChange}
            value={form.cardTitle}
          />
          {errors.cardTitle && (
            <div className="text-sm text-red-500">
              {errors.cardTitle.message}
            </div>
          )}
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Number
          </label>
          <div className="relative ">
          
          <input
            name="cardNumber"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{16}$/,
                message: "Card number is invalid",
              },
            })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="1234 5678 9012 3456"
            onChange={handleChange}
            value={form.cardNumber}
          />
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className={value.show?"h-6 w-6 absolute z-10 top-1 hover:scale-110 right-1 hover:cursor-pointer" : "hidden"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth={2}
        onClick={()=>{handleCopy(form.cardNumber)}}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
      </div>
          {errors.cardNumber && (
            <div className="text-sm text-red-500">
              {errors.cardNumber.message}
            </div>
          )}
        </div>
        {/* Expiry Month*/}
        <div className="flex items-center justify-start gap-6 md:gap-10 mb-5">
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Expiry Month
            </label>
            <Dropdown 
              options={months}
              value={form.expiryMonth}
              onChange={(month) => setForm({ ...form, expiryMonth: month })}
              label="Select"
            />
          </div>

          {/* Expiry Year */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Expiry Year
            </label>
            <Dropdown className=""
              options={years}
              value={form.expiryYear}
              onChange={(year) => setForm({ ...form, expiryYear: year })}
              label="Select"
            />
          </div>
        </div>
        {/* CVV */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CVV
          </label>
          <div className="relative">

          
          <input type="text"
            name="cvv"
            {...register("cvv", {
              required: "CVV is required",
              pattern: {
                value: /^\d{3,4}$/,
                message: "CVV is invalid",
              },
            })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="123"
            onChange={handleChange}
            value={form.cvv}
          />
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className={value.show?"h-6 w-6 absolute z-10 top-1 hover:scale-110 right-1 hover:cursor-pointer" : "hidden"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth={2}
        onClick={()=>{handleCopy(form.cvv)}}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
      </div>
          {errors.cvv && (
            <div className="text-sm text-red-500">{errors.cvv.message}</div>
          )}
        </div>

        {/* Card Holder's Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Holder's Name
          </label>
          <div className="relative">
          <input
            name="cardHolderName"
            {...register("cardHolderName", {
              required: "Card holder's name is required",
            })}
            className="bg-[#F1F3F6] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name on the card"
            onChange={handleChange}
            value={form.cardHolderName}
          />
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className={value.show?"h-6 w-6 absolute z-10 top-1 hover:scale-110 right-1 hover:cursor-pointer" : "hidden"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
        strokeWidth={2}
        onClick={()=>{handleCopy(form.cardHolderName)}}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
      </div>
          {errors.cardHolderName && (
            <div className="text-sm text-red-500">
              {errors.cardHolderName.message}
            </div>
          )}
        </div>
        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button 
            type="submit"
            className="bg-white border-2 box-border border-[#FD7401] hover:bg-[#FD7401] hover:text-white text-[#FD7401] font-bold py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
