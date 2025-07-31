import React, { useEffect, useState } from "react";
import {
  FaCashRegister,
  FaList,
  FaPlus,
  FaReceipt,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import {
  HiArrowLeft,
  HiOutlineUser,
  HiOutlineViewBoards,
  HiOutlineViewList,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CreateItem from "../CreateItem";
import PaymentModal from "../PaymentModal";
import { useSelector } from "react-redux";

export default function RouteSelect() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const tabParams = new URLSearchParams(location.search);
    const tabFromURL = tabParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  return (
    <>
      <div className='space-y-1 bg-[#f1f7f3] z-[-]'>
        <Route
          title='Profile'
          Icon={tab === "profile" ? <HiUser /> : <HiOutlineUser />}
          selected={tab === "profile" ? true : false}
          to='/dashboard?tab=profile'
        />
        {currentUser.isAdmin && (
          <>
            <Route
              title='Overview'
              Icon={
                tab === "overview" ? <HiViewBoards /> : <HiOutlineViewBoards />
              }
              selected={tab === "overview" ? true : false}
              to='/dashboard?tab=overview'
            />

            <Route
              title='Paid Students'
              Icon={<FaList />}
              selected={tab === "paid-students" ? true : false}
              to='/dashboard?tab=paid-students'
            />
            <div
              onClick={() => {
                setIsOpen(!isOpen);
              }}>
              <Route Icon={<FaPlus />} title='Add Transactions' />
            </div>
          </>
        )}
        {/* <Route Icon={<FaReceipt />} title='Payments' /> */}
        <Route
          title='Transactions'
          Icon={<FaCashRegister />}
          selected={tab === "transactions" ? true : false}
          to='/dashboard?tab=transactions'
        />
        {/* <Link to={"/create-item"}> */}

        {/* </Link> */}
      </div>
      <AnimatePresence initial={false}>
        {isOpen ? (
          //   <motion.div
          //     initial={{ opacity: 0, scale: 0 }}
          //     animate={{ opacity: 1, scale: 1 }}
          //     exit={{ opacity: 0, scale: 0 }}>

          <div
            className='fixed left-[50%] top-1/2   inset- 
   z-[1000] ]
  -translate-x-1/2 -translate-y-1/2  '>
            <motion.div
              className=' bg-white w-[350px] sm:w-[450px] 
            px-5 sm:px-10 py-10 rounded-2xl
          '
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}

              // initial={{ opacity: 0, height: 0, width: 0 }}
              // animate={{
              //   opacity: 1,
              //   height: "",
              //   width: "",
              //   transition: { duration: 0.2 },
              // }}
              // exit={{
              //   height: 0,
              //   transition: { duration: 0.2 },
              // }}
            >
              <div
                className='  py-3 flex justify-end
            '>
                {/* <FaTimes
                  size={25}
                  className=''
                  onClick={() => setIsOpen(false)}
                /> */}
                <button
                  className=' flex flex-col justify-center items-center
                space-y-1 px-2'
                  onClick={() => setIsOpen(!open)}>
                  <span
                    className=' block bg-black h-0.5 w-5 z-
                   rotate-45 translate-y-1.5'></span>
                  <span
                    className=' block bg-black h-0.5 w-5 z- 
                  -rotate-45 -translate-y-[0.rem]'></span>
                </button>
              </div>
              <CreateItem close />

              {/* <PaymentModal></PaymentModal> */}
            </motion.div>
          </div>
        ) : // {/* </motion.div>
        null}
      </AnimatePresence>

      {isOpen && (
        <div
          className='fixed  inset-0 bg-[#111] opacity-85 z-[100]'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

const Route = ({ title, selected = false, Icon, click, to }) => {
  return (
    <Link
      to={to}
      className={`flex items-center justify-start gap-2
     w-full px-2 py-1.5 rounded
    text-sm
    transition-[box-shadow,_background-color_color] ${
      selected
        ? "bg-white text-[#7a998a] shadow"
        : "hover:bg-[#ddebe0] bg-transparent text-[#7a998a] shadow-none"
    }   `}
      onClick={click}>
      {Icon}
      <span>{title}</span>
    </Link>
  );
};
