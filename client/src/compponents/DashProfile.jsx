import React, { useEffect, useState } from "react";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { HiOutlineExclamationCircle, HiPencil } from "react-icons/hi";
import RecentTransactions from "./Dashboard/RecentTransactions";
import Paystack from "@paystack/inline-js";
import { AnimatePresence, motion } from "framer-motion";

import img1 from "../assets/images/ibbul-img.webp";

export default function DashProfile() {
  const currentUser = {
    user: "Adam Abduljalil",
    email: "adam@gmail.com",
    matricNumber: "U22/fns/csc/2131",
  };
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [PaymentData, setPaymentData] = useState({
    email: currentUser.matricNumber + "@gmail.com",
    // amount: selectedItem.price * 100,
  });
  const [showModal, setShowModal] = useState(false);
  console.log(selectedItem);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/item/get-items");
        const data = await res.json();

        if (!res.ok) {
          return alert(data.message);
        }

        setItems(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  const payWithPaystack = () => {
    setShowModal(!showModal);
    const popup = new Paystack();

    popup.newTransaction({
      key: "pk_test_824b1c362014734e6d55e5e719c2cbd0ae40d361",
      email: PaymentData.email,
      amount: Number(selectedItem.price) * 100,
      metadata: {
        itemId: selectedItem._id,
        email: PaymentData.email,
      },
      callback: async function (response) {
        alert("Payment complete! Reference: " + response.reference);
      },
      onSuccess: (transaction) => {
        console.log(transaction);
      },
      onLoad: (response) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        console.log("onCancel");
      },
      onError: (error) => {
        console.log("Error: ", error.message);
      },
    });
  };

  // const handleChange = (e) => {
  //   setPaymentData({ ...PaymentData, [e.target.id]: e.target.value.trim() });
  // };

  // const handleSubmit = async (e) => {
  //   setIsLoading(true);
  //   e.preventDefault();

  //   if (!PaymentData.amount) return;

  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       "https://api.paystack.co/transaction/initialize",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization:
  //             "Bearer sk_test_1d3f0d7cd61c3a8476b995c7b0597daa67eb2d2f",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           // matricNo: formData.matricNo,
  //           // firstname: formData.firstname,
  //           // lastname: formData.lastname,
  //           email: PaymentData.email + "@gmail.com",
  //           amount: parseFloat(PaymentData.amount) * 100, // Convert to kobo/cents
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status) {
  //       // Redirect to Paystack checkout page
  //       // setPaymentDetails(data.data.authorization_url);
  //       setIsLoading(false);
  //       window.location.href = data.data.authorization_url;
  //       // console.log(data);
  //     } else {
  //       setIsLoading(false);
  //       console.log("Payment initialization failed. Please try again.");
  //     }
  //   } catch (err) {
  //     // setError("An error occurred. Please try again later.");
  //     setIsLoading(false);
  //     console.error("Payment error:", err);
  //   }
  // };

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
          {items.length > 0 &&
            items.map((item) =>
              item ? (
                // <option key={item._id}>{item.itemName}</option>
                <Card
                  className='bg-[#ddebe0] text-[#7a998a] shadow
          hover:bg-[#ddebe0]/60  rounded-lg  block 
          transition-[box-shadow,_background-color_color]
          h-[180px]'
                  imgSrc={img1}
                  amount={item.price}
                  key={item._id}
                  nameType={item.itemName}
                  description={"for 100L"}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}
                />
              ) : (
                <p key={"no item"}>No item for this Amount</p>
              )
            )}
          {/* <Card
            className='bg-[#ddebe0] text-[#7a998a] shadow
    hover:bg-[#ddebe0]/60  rounded-lg  block 
    transition-[box-shadow,_background-color_color]
    h-[180px]'
            imgSrc={img1}
            amount={2200}
            nameType={"Manual 104"}
            description={"for 100L"}
            onClick={() => setShowModal(!showModal)}
          /> */}
        </div>
      </div>
      <div
        className='  
        '>
        <AnimatePresence initial={false}>
          {showModal ? (
            <div
              className='fixed left-[50%] top-1/2   inset- 
         z-[1000] ]
        -translate-x-1/2 -translate-y-1/2 p-4 '>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='bg-white w-[350px] h-auto py-5 rounded-2xl'
                // initial={{ opacity: 0, height: 0 }}
                // animate={{
                //   opacity: 1,
                //   height: "250px",

                //   transition: { duration: 0.2 },
                // }}
                // exit={{
                //   height: "0",
                //   transition: { duration: 0.2 },
                // }}
              >
                {/* <form onSubmit={handleSubmit}> */}
                <div className='text-center '>
                  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mx-auto mb-4' />
                  <p className=' font-semibold uppercase'>
                    {currentUser.matricNumber}
                  </p>
                  {/* <h3 className=' text-gray-400 mb-5  '>
                    Are you sure want to you buy
                  </h3> */}
                  <h3 className='text-gray-400 mb-5'>
                    Are you sure you want to buy{" "}
                    <strong>{selectedItem?.itemName}</strong> for ₦
                    {selectedItem?.price}?
                  </h3>

                  <div className=' flex  justify-center gap-4'>
                    <button
                      className=' bg-green-600/90 p-3 font-semibold rounded-lg
                text-white shadow hover:bg-green-600/100
                transition-[boxshadow,_background-color_color]
                 disabled:bg-green-600/60 disabled:cursor-not-allowed
              '
                      onClick={payWithPaystack}
                      disabled={isLoading}>
                      {isLoading ? "Processing..." : "Yes, i'm sure"}
                    </button>
                    <a
                      className='p-3 px-5 font-semibold rounded-lg
                text-green-800
                bg-green-400/40 shadow hover:bg-green-400/50
                transition-[boxshadow,_background-color_color]'
                      onClick={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </a>
                  </div>
                </div>
                {/* </form> */}
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
      {showModal && (
        <div
          className='fixed  inset-0 bg-[#111] opacity-80 z-[100]'
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

const Card = ({
  amount,
  nameType,
  description,
  onClick,
  className,
  imgSrc,
}) => {
  return (
    //     <form
    //       onSubmit={onSubmit}
    //       className=' bg-[#ddebe0] text-[#7a998a] shadow
    //     hover:bg-[#ddebe0]/60  rounded-lg
    //     transition-[box-shadow,_background-color_color] flex flex-col  py-3
    //    items-center
    // '>
    <button className={className} onClick={onClick}>
      <div
        className='img-sec w-full bg-white h-[130px] 
      rounded-tr-lg rounded-tl-lg relative'>
        <img
          className=' w-full h-full  object-cover
          rounded-tr-lg rounded-tl-lg border-none outline-none 
          '
          src={imgSrc}
          alt={nameType + "-" + description}
        />
      </div>
      <div className=' flex flex-col mt-0.5 px-3 py-1'>
        <h1
          className='uppercase text-sm 
      inline-block text-nowrap font-bold text-start  '>
          {nameType}
        </h1>
        <p className=' font-semibold  text-start  '>₦{amount}</p>
        {/* <p className=' font-medium  text-[.8rem] '>{description}'s</p> */}
      </div>
    </button>
    // </form>
  );
};
