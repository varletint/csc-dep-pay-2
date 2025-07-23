import React, { useState } from "react";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { HiOutlineExclamationCircle, HiPencil } from "react-icons/hi";
import RecentTransactions from "./Dashboard/RecentTransactions";
import { motion } from "framer-motion";

export default function DashProfile() {
  const currentUser = {
    user: "Adam Abduljalil",
    email: "adam@gmail.com",
    matricNumber: "U22/fns/csc/2131",
  };
  const [isLoading, setIsLoading] = useState(false);
  // const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [PaymentData, setPaymentData] = useState({
    email: currentUser.matricNumber,
    amount: 5000,
  });

  // console.log(PaymentData);

  // const handleChange = (e) => {
  //   setPaymentData({ ...PaymentData, [e.target.id]: e.target.value.trim() });
  // };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!PaymentData.amount) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer sk_test_1d3f0d7cd61c3a8476b995c7b0597daa67eb2d2f",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // matricNo: formData.matricNo,
            // firstname: formData.firstname,
            // lastname: formData.lastname,
            email: PaymentData.email + "@gmail.com",
            amount: parseFloat(PaymentData.amount) * 100, // Convert to kobo/cents
          }),
        }
      );

      const data = await response.json();

      if (data.status) {
        // Redirect to Paystack checkout page
        // setPaymentDetails(data.data.authorization_url);
        setIsLoading(false);
        window.location.href = data.data.authorization_url;
        // console.log(data);
      } else {
        setIsLoading(false);
        console.log("Payment initialization failed. Please try again.");
      }
    } catch (err) {
      // setError("An error occurred. Please try again later.");
      setIsLoading(false);
      console.error("Payment error:", err);
    }
  };

  return (
    <div className=' py- sm:h-[auto]   bg-whit rounded-2xl shaow bg-rd-400'>
      <div className='md:mt-[5rem] mt-10 bg-re-200 p-3 max-w-xl mx-auto'>
        <div
          className='rounded-full sm:w-[120px] sm:h-[120px]
       w-[120px] h-[120px] bg-[#d6d5d5] mx-auto'>
          <img alt='profile-image' />
        </div>
        <div className='profile-details mt-10 md:gap-8 flex sm:justify-center justify-between'>
          <div className=' name'>
            <h1 className=' font-medium text-nowrap capitalize'>
              {currentUser.user}
            </h1>
            <p className=' font-medium mt-2'>Computer Science</p>
            <p
              className=' font-medium text-black/50
          uppercase text-nowrap'>
              {currentUser.matricNumber}
            </p>
          </div>
          <HiPencil size='20' />
        </div>
        <div className='grid grid-cols-2 gap-4 mt-10 mb-'>
          <Card
            amount={2200}
            nameType={"Manual 104"}
            description={"for 100L"}
            onClick={() => setShowModal(!showModal)}
          />
        </div>
      </div>
      {showModal ? (
        <motion.form
          onSubmit={handleSubmit}
          className='fixed left-[50%] top-1/2   inset-0 
        bg-white z-[1000] w-[350px] py-[rem] h-[px] sm:w-[px]
        -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl  
        '
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "250px",

            transition: { duration: 0.2 },
          }}
          exit={{
            height: "0",
            transition: { duration: 0.2 },
          }}>
          <div className='text-center '>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mx-auto mb-4' />
            <p className=' font-semibold uppercase'>
              {currentUser.matricNumber}
            </p>
            <h3 className=' text-gray-400 mb-5  '>
              Are you sure want to you buy
            </h3>

            <div className=' flex  justify-center gap-4'>
              <button
                className=' bg-green-600/90 p-3 font-semibold rounded-lg
                text-white shadow hover:bg-green-600/100
                transition-[boxshadow,_background-color_color]
                 disabled:bg-green-600/60 disabled:cursor-not-allowed
              '
                disabled={isLoading}>
                Yes, i'm sure
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
        </motion.form>
      ) : null}
      {showModal && (
        <div
          className='fixed  inset-0 bg-[#111] opacity-30 z-[100]'
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

const Card = ({ amount, nameType, description, onClick }) => {
  return (
    //     <form
    //       onSubmit={onSubmit}
    //       className=' bg-[#ddebe0] text-[#7a998a] shadow
    //     hover:bg-[#ddebe0]/60  rounded-lg
    //     transition-[box-shadow,_background-color_color] flex flex-col  py-3
    //    items-center
    // '>
    <button
      className=' bg-[#ddebe0] text-[#7a998a] shadow
    hover:bg-[#ddebe0]/60  rounded-lg
    transition-[box-shadow,_background-color_color] flex flex-col  py-3
   items-center
'
      onClick={onClick}>
      <h1 className=' font-semibold text-xl text-nowrap inline-block'>
        {nameType}
      </h1>
      <p className=' font-semibold mt-3 '>₦{amount}</p>
      <p className=' font-semibold mt-2 '>{description}</p>
    </button>
    // </form>
  );
};
