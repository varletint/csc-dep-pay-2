import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative z-[9999]'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex flex-col justify-center
         items-center w-10 h-10 space-y-1 group z-[10000000] relative'>
        <span
          className={`block h-0.5 w-6 bg-black transform transition duration-300 ease-in-out 
            ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition duration-300 ease-in-out 
            ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transform transition duration-300 ease-in-out 
            ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        />
      </button>

      <div
        className='absolute top-[100%] right-0 
        '>
        <AnimatePresence initial={false}>
          <motion.div
            className='  bg-white shadow-md rounded-lg
      
        '
            initial={{
              width: false,
              opacity: 0,
            }}
            animate={{
              width: isOpen ? "" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            exit={{ width: 0, opacity: 0 }}>
            <nav
              className={`mt-1 space-y-2 text w-[150px] font-medium list-none  
         py-2 ${isOpen ? "flex flex-col" : "hidden"} ]`}>
              <a
                href='#home'
                className='hover:bg-gray-50 px-3 py-2
                transition-[box-shadow,_background-color_color]
               w-full'>
                Home
              </a>
              <a
                href='#prices'
                className='hover:bg-gray-50 px-3 py-2
                transition-[box-shadow,_background-color_color]
               w-full'>
                Price
              </a>
              <a
                href='#verify'
                className=' hover:bg-gray-50 px-3 py-2
                transition-[box-shadow,_background-color_color]
               w-full'>
                Verify
              </a>

              {/* <a href='#contact' className=''>
                Contact us
              </a> */}
              <Link
                to='/dashboard?tab=profile'
                className='hover:bg-gray-50 px-3 py-2
                transition-[box-shadow,_background-color_color]
               w-full'>
                Login
              </Link>
            </nav>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay */}
      {/* {isOpen && (
        // <div
        //   className='fixed inset-0 bg-red opacity-30 z-40'
        //   onClick={() => setIsOpen(false)}
        // />
      )} */}
    </div>
  );
};

export default HamburgerMenu;
