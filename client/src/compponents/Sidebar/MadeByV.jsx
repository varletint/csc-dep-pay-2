import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  HiLogout,
  HiOutlineExclamationCircle,
  HiOutlineLogout,
} from "react-icons/hi";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { FaDoorClosed } from "react-icons/fa";

export default function MadeByV() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(error);
      } else {
        setShowModal(false);
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className=' text-xs
  text-[#7a998a] py-2 px-2 sticky justify-end sm:m mt-5
  top-[calc(100vh_-_48px_-_16px)]  border-[#c7e9d9] z-[1022]
  md:border-none border-'>
      <div className='flex items-center justify-between '>
        <div className='flex flex-col items-start '>
          <button
            onClick={() => setShowModal(true)}
            className=' 
          text-sm flex items-center gap-2'>
            <span>
              <HiOutlineLogout size={20} />
            </span>
            Log out
          </button>
          {/* <p className=' font-bold'>varletint</p>
          <p className='text-xs text-[#8aa197] z-0 '>junior web.dev</p> */}
        </div>
      </div>
      <div
        className=' text-sm 
        '>
        <AnimatePresence initial={false}>
          {showModal ? (
            <div
              className='fixed left-[50%] top-1/2   inset- 
         z-[10000] ]
        -translate-x-1/2 -translate-y-1/2 p-4 '>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='bg-white w-[350px] h-auto py-5 rounded-2xl'>
                <div className='text-center '>
                  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mx-auto mb-4' />
                  <p className=' font-semibold uppercase'></p>

                  <h3 className='text-gray-400 mb-5 px-2'>
                    Are you sure you want to{" "}
                    <strong className=' '>Logout</strong>?
                  </h3>

                  <div className=' flex  justify-center gap-4'>
                    <button
                      className=' bg-green-600/90 p-3 px-8  font-semibold rounded-lg
                text-white shadow hover:bg-green-600/100
                transition-[boxshadow,_background-color_color]
                 disabled:bg-green-600/60 disabled:cursor-not-allowed
              '
                      onClick={handleClick}>
                      {"Yes"}
                    </button>
                    <button
                      className='p-3 px-5 font-semibold rounded-lg
                text-green-800
                bg-green-400/40 shadow hover:bg-green-400/50
                transition-[boxshadow,_background-color_color]'
                      onClick={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
      {showModal && (
        <div
          className='fixed  inset-0 bg-[#111] opacity-80 z-[1000]'
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
