import React from "react";
import { HiExclamationCircle } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const tab = new URLSearchParams(location.search);

  const params = tab;
  params.set("userId", "900");

  console.log(tab);
  return (
    <div
      className='min-h-screen w-full justify-center items-center flex
    text-[9rem] font-bold flex-col bg-slate-50 '>
      <HiExclamationCircle
        size={100}
        onClick={() => navigate("/")}
        color='#e7e5e5'
        className=' hover:cursor-pointer'
      />
      <span
        onClick={() => navigate("/")}
        className='text-xl font-semibold text-[#999] hover:cursor-pointer'>
        Page not found
      </span>
    </div>
  );
}
