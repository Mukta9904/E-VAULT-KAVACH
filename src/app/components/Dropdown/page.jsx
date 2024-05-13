"use client"
import { useState } from "react";
export const Dropdown = ({ options, value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSelect = (option) => {
      onChange(option);
      setIsOpen(false);
    };
  
    return (
      <div className={isOpen?"absolute text-sm top-5 w-[80px] sm:w-[120px] z-10 h-44 overflow-auto ":"absolute text-sm top-5 w-[80px] sm:w-[120px] z-10 overflow-auto"}>
        <button
          type="button"
          className="bg-[#F1F3F6] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? value : label}
        </button>
        {isOpen && (
          <ul className="absolute z-10 bg-white border rounded w-full">
            {options.map((option) => (
              <li
                key={option}
                className="py-2 px-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
