import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AccountToggle() {
  // const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-[#ddebe0] '>
      <button
        className='
          flex p-0.5 hover:bg-[#ddebe0/]
          rounded transition-colors relative
          gap-2 w-full items-center
          '>
        <div className='text-start'>
          <span
            className='text-xl
                   block font-bold text-[#555] px-3'>
            {/* {currentUser.username} */}
            <Link to='/'>Dept.C Pay</Link>
          </span>
          <span
            className='text-xs
                   block text-[#8d9e91]'>
            {/* {currentUser.username}@dev.react */}
          </span>
        </div>
      </button>
    </div>
  );
}
