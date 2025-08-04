import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  HiIdentification,
  HiOutlineIdentification,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineUserCircle,
} from "react-icons/hi";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
  clearError,
} from "../redux/user/userSlice";

export default function SignUp() {
  const schema = yup.object().shape({
    name: yup.string().required("This field can't be empty"),
    password: yup.string().required("This field can't be empty"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field can't be empty"),
    matricNumber: yup.string().required("This field can't be empty"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { error: errorMessage, loading: showLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  document.title = "Login page";

  if (errorMessage || errors) {
    setTimeout(() => {
      dispatch(clearError());
    }, 3000);
  }

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      dispatch(signInStart());

      const res = await fetch(`/api/auth/signup`, {
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
        navigate(`/login`);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.matricNumber || !formData.password) {
  //     return dispatch(signInFailure("Fields cannot be empty"));
  //   }

  //   try {
  //     setIsLoading(true);
  //     dispatch(signInStart());

  //     const res = await fetch(`/api/auth/signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();

  //     if (data.success === false) {
  //       setIsLoading(false);
  //       return dispatch(signInFailure(data.message));
  //     }
  //     if (res.ok) {
  //       setIsLoading(false);
  //       dispatch(signInSuccess(data));
  //       navigate(`/login`);
  //     }
  //   } catch (error) {
  //     dispatch(signInFailure(error.message));
  //   }
  // };

  return (
    <div className='h-[100vh]'>
      <div
        className='flex max-w-[25rem] justify-center
         h-full flex-col mx-auto
       '>
        <div className=' bg-white py-10 px-5 sm:px-0 rounded-xl shadow-md '>
          <div className=' '>
            <h3 className='text-center sm:text-3xl mb-[1.25rem] text-2xl font-bold'>
              Create a new account
            </h3>
          </div>
          <div className=''>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-2 sm:px-[2.2rem]'>
              <div className=''>
                <label className=' font-semibold text-[#687a72]'>
                  Matric Number
                </label>
                <br />
                <span className=' text-red-500 text-sm'>
                  {" "}
                  {errors.matricNumber?.message}
                </span>
                <div
                  className=' w-full mt-1.5  
                  border border-[#3e5a4e] flex 
              gap-3 items-center p-2 py-2.5  shadow rounded-lg'>
                  <HiOutlineIdentification
                    size={23}
                    className=' text-[#a1998a]'
                  />
                  <input
                    type='text '
                    id='matricNumber'
                    // value={formData.email}
                    className='w-full text-[#a1998a] border-none bg-transparent 
            placeholder:text-[#a1998a] placeholder:font-medium
          focus:outline-none uppercase placeholder:capitalize font-semibold '
                    placeholder='Matric Number'
                    {...register("matricNumber")}
                  />
                </div>
              </div>
              <div className=''>
                <label className=' font-semibold text-[#687a72]'>
                  Fullname
                </label>
                <br />
                <span className=' text-red-500 text-sm'>
                  {" "}
                  {errors.name?.message}
                </span>
                <div
                  className=' w-full mt-1.5 border border-[#3e5a4e]
                   flex 
              gap-3 items-center p-2 py-2.5  shadow rounded-lg'>
                  <HiOutlineUserCircle size={23} className=' text-[#a1998a]' />
                  <input
                    type='text '
                    id='name'
                    // value={formData.email}
                    className='w-full text-[#a1998a] border-none bg-transparent 
            placeholder:text-[#a1998a] placeholder:font-medium
          focus:outline-none  capitalize font-semibold '
                    placeholder='Fullname'
                    {...register("name")}
                  />
                </div>
              </div>
              <div className=''>
                <label className=' font-semibold text-[#687a72]'>Email</label>{" "}
                <br />
                <span className=' text-red-500 text-sm'>
                  {" "}
                  {errors.email?.message}
                </span>
                <div
                  className=' w-full mt-1.5 bg-[] flex 
              gap-3 items-center p-2 py-2.5  shadow rounded-lg
              border border-[#3e5a4e]'>
                  <HiOutlineMail size={23} className=' text-[#a1998a]' />
                  <input
                    type='email '
                    id='email'
                    // value={formData.email}
                    className='w-full text-[#a1998a] border-none bg-transparent 
            placeholder:text-[#a1998a] placeholder:font-medium font-semibold
          focus:outline-none'
                    placeholder='Email'
                    {...register("email")}
                  />
                </div>
              </div>

              <div className=''>
                <label className=' font-semibold text-[#687a72]'>
                  Password
                </label>{" "}
                <br />
                <span className=' text-red-500 text-sm'>
                  {" "}
                  {errors.password?.message}
                </span>
                <div
                  className=' w-full mt-1.5 border border-[#3e5a4e] flex 
              gap-3 items-center p-2 py-2.5  shadow rounded-lg'>
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
                    {...register("password")}
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
                {showLoading ? (
                  <span> Creating Account... </span>
                ) : (
                  "  Create Account"
                )}
              </button>
              <p className='text-center text-sm text-[#687a72]'>
                Already have an account?{" "}
                <Link
                  to='/login'
                  className='text-[#0d9488] font-medium hover:underline'>
                  Login
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
