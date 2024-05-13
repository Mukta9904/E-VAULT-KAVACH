"use client"
import React from 'react'
import PaymentForm from '@/app/components/savePayment/page'
import { useState , useEffect} from 'react'
import { paymentContext } from "@/context/context";

const payments = () => {
  const [payments, setPayments] = useState([]);
  const [showPayments, setshowpayments] = useState({});
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      let a = await fetch("/api/user/showPayments", { method: "GET" });
      let res = await a.json();
      console.log(res.data);
      setPayments(res.data);
    }
    fetchData();
  }, []);

  const handleShow = (obj) => {
    console.log(obj);
    console.log(obj._id || obj.id);
    setshowpayments(obj);
    setShow(!show);
    setCreate(false);
  };

  const handleDelete = async (obj) => {
    let a = await fetch("/api/user/deletePayment", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: obj._id ? obj._id : obj.id }),
    });

    let r = await fetch("/api/user/showPayments", { method: "GET" });
    let res = await r.json();
    setPayments(res.data);
  };
  return (
    <paymentContext.Provider
      value={{ payments, setPayments, create, setCreate, show, setShow }}
    >
      <div className=" w-full h-[100%]">
        <div className="flex p-3 sticky top-0 z-10 bg-[#EBDFD7] text-gray-700 text-2xl font-semibold justify-between items-center">
          <span>Payment Cards</span>
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
            {payments &&
              payments.map((user) => {
                return (
                  <div
                    onClick={(e) => {
                      handleShow(user), e.stopPropagation();
                    }}
                    key={user._id || user.id}
                    className={`cursor-pointer transition-all duration-300 hover:bg-[#eac7a3] hover:scale-[1.02] flex items-center justify-between bg-[#f2eae5e6] py-2 px-6 rounded-[10px] shadow-md m-3 ${
                      show || create ? "hidden md:flex" : ""
                    } `}
                  >
                    <div className="w-full">
                      <h2 className="text-black text-lg font-semibold mb-2">
                        {user.cardTitle}
                      </h2>
                      <div className="w-[98%]  h-[1px] opacity-40 bg-black"></div>
                      <p className="mb-2">
                        <span className="text-black text-md">****{user.cardNumber.slice(user.cardNumber.length - 4)}</span>
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
            <PaymentForm className="absolute top-10 transition-all right-[20px] " />
          )}
          {show && (
            <PaymentForm
              id={showPayments._id || showPayments.id}
              cardTitle={showPayments.cardTitle}
              cardNumber={showPayments.cardNumber}
              expiryMonth={showPayments.expiryMonth}
              expiryYear={showPayments.expiryYear}
              cvv={showPayments.cvv}
              cardHolderName={showPayments.cardHolderName}
              heading="Edit"
              className="absolute w-[600px] transition-all right-[20px]"
            />
          )}
        </div>
      </div>
      </paymentContext.Provider>
  )
}

export default payments
