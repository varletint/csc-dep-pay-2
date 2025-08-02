import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
  clearError,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { error: errorMessage, loading: showLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  document.title = "Login page";

  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearError());
    }, 1000);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.matricNumber || !formData.password) {
      return dispatch(signInFailure("Fields cannot be empty"));
    }

    try {
      setIsLoading(true);
      dispatch(signInStart());

      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setIsLoading(false);
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        setIsLoading(false);
        dispatch(signInSuccess(data));
        navigate(`/dashboard?tab=profile`);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='h-[100vh]'>
      <div
        className='flex max-w-[25rem] justify-center
         h-full flex-col mx-auto
       '>
        <div className=' bg-white py-10 px-5 sm:px-0 rounded-xl shadow-md '>
          <div className=' '>
            <h3 className='text-center sm:text-3xl mb-[1.25rem] text-2xl font-bold'>
              Login Page
            </h3>
          </div>
          <div className=''>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-2 sm:px-[2.2rem]'>
              <div className=''>
                <label className=' font-semibold text-[#687a72]'>
                  Matric Number
                </label>
                <div
                  className=' w-full mt-1.5 bg-[#ddebe0]/ border
                   border-[#56bd90] flex lowercase
              gap-3 items-center p-2 py-2.5   :shadow-2xl rounded-lg'>
                  <HiOutlineMail size={23} className=' text-[#a1998a]' />
                  <input
                    type='text '
                    id='matricNumber'
                    className='w-full text-[#a1998a] border-none bg-transparent 
            placeholder:text-[#a1998a] placeholder:font-medium
          focus:outline-none'
                    placeholder='Matric Number'
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=''>
                <label className=' font-semibold text-[#687a72]'>
                  Password
                </label>
                <div
                  className=' w-full mt-1.5 border
                   border-[#56bd90] flex 
              gap-3 items-center p-2 py-2.5  shado rounded-lg'>
                  <HiOutlineLockClosed
                    size={23}
                    className=' 
                text-[#8aa197]'
                  />
                  <input
                    type='password'
                    className='w-full border-none bg-transparent
                  text-[#a1998a] 
            placeholder:text-[#a1998a] placeholder:font-medium
          focus:outline-none'
                    placeholder='Password'
                    id='password'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className='bg-[#3e5a4e] 
                disabled:bg-[#3e5a4e]/75
                 p-2 mt-6 disabled:cursor-not-allowed
            text-white rounded-lg font-medium shadow'
                type='submit'
                disabled={showLoading}>
                {showLoading ? <span>Processing...</span> : "  Login"}
              </button>
              <p className='text-center text-sm text-[#3e5a4e]'>
                Don't have an account?{" "}
                <Link
                  to='/register'
                  className='text-[#0d9488] font-medium hover:underline'>
                  Sign Up
                </Link>
              </p>
            </form>

            {errorMessage && (
              <p
                className='mt-2 text-center p-3 
              text-red-600 font-medium text-sm
              '>
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
