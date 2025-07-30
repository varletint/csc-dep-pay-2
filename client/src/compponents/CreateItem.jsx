import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemSuccess,
  addItemFailure,
  addItemStart,
  clearError,
} from "../redux/user/userSlice";

// Note:
//      Browserslist: browsers data( caniuse - lite ) is 35 months old.Please run:
//    npx update-browserslist-db@latest

export default function CreateItem({ close }) {
  const [price, setPrice] = useState("");

  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadErrorMessage, setLoadErrorMessage] = useState(null);
  const { error: errorMessage, loading: isLoad } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  setTimeout(() => {
    if (errorMessage) {
      dispatch(clearError());
    }
  }, 1000);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const formatCurrency = (value) => {
    const number = Number(value.replace(/\D/g, "")); // remove non-digits
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };
  const handlePriceChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ""); // only digits
    setPrice(raw);
    setFormData({ ...formData, price: raw }); // store raw number
  };

  // useEffect(() => {
  //   dispatch(clearError());
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { price, itemName, category } = formData;

    if (!price || !itemName || !category) {
      setLoadErrorMessage("All field are required");
      return dispatch(addItemFailure("All fields are required"));
    }

    try {
      dispatch(addItemStart());
      const res = await fetch("/api/item/create-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setLoadErrorMessage(data.message);
        return dispatch(addItemFailure(data.message));
      }
      setIsLoading(false);
      if (data.success === false) {
        setLoadErrorMessage(data.message);
        return dispatch(addItemFailure(data.message));
      }
      if (res.ok) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 1500);

        dispatch(addItemSuccess(data));
        navigate("/dashboard?tab=profile");
      }
    } catch (error) {
      setLoadErrorMessage(error.message);
      dispatch(addItemFailure(error.message));
    }
    // clearTimeout(() => {
    //   setTimeOut;
    // });
  };
  return (
    <div className=' flex flex-col z-[101]'>
      <h1
        className='text-center text-2xl font-medium
      sm:text-3xl sm:font-semibold text-[#04663b] '>
        Create Item
      </h1>
      <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5'>
        <div className=''>
          <label />
          <input
            type='text'
            name='itemName'
            id='itemName'
            placeholder='Item Name'
            // required
            onChange={handleChange}
            className='bg-[#ddebe0] w-full py-3 rounded-lg px-5
            placeholder:text-[#8aa197] shadow font-medium'
          />
        </div>
        <div className=''>
          <label />
          <input
            type='text'
            name='price'
            id='price'
            // required
            value={price ? formatCurrency(price) : ""}
            onChange={handlePriceChange}
            placeholder='Price of the Item'
            className='bg-[#ddebe0] w-full py-3 rounded-lg px-5
            placeholder:text-[#8aa197] focus:outline-none 
            shadow font-medium'
          />
        </div>
        <div className=''>
          <div
            className='category'
            id='category'
            // onChange={(e) => {
            //   setFormData({ ...formData, category: e.target.value });
            // } }
          >
            <div
              className='different bg-[#ddebe0] w-full py-3 rounded-lg px-5
            placeholder:text-[#8aa197] shadow font-medium'>
              <select
                id='category'
                // required
                className='w-full bg-transparent outline-none'
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }>
                <option value=''>Select category</option>
                <option value={"Departmental Fee"}>Departmental fee</option>
                <option value={"Books and Manual"}>Books and Manuals</option>
                <option value={"Field Trip"}>Field Trip</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='bg-[#3e5a4e]
           font-medium text-white p-[12px] rounded-lg mt-4
           disabled:bg-[#3e5a4e]/80'
          disabled={isLoad}>
          {isLoad ? "Adding item..." : "Add item"}
        </button>
      </form>

      {errorMessage && (
        <p className='mt-3 text-red-500 font-medium text-center'>
          {errorMessage}
        </p>
      )}

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
                  <HiThumbUp className='h-14 w-14 text-green-500 mx-auto mb-4' />
                  <p className=' font-semibold uppercase'>
                    {/* {currentUser.matricNumber} */}
                  </p>
                  <h3 className=' text-[#222] mb-  '>
                    {/* Are you sure want to you buy */}
                    Your Item has been <br /> upload successful
                  </h3>

                  <div className=' flex  justify-center gap-4'>
                    {/* <button
                      className=' bg-green-600/90 p-3 font-semibold rounded-lg
                text-white shadow hover:bg-green-600/100
                transition-[boxshadow,_background-color_color]
                 disabled:bg-green-600/60 disabled:cursor-not-allowed
              '
                      // onClick={payWithPaystack}
                      // disabled={isLoading}
                    >
                      
                    </button> */}
                    {/* <a
                      className='p-3 px-5 font-semibold rounded-lg
                text-green-800
                bg-green-400/40 shadow hover:bg-green-400/50
                transition-[boxshadow,_background-color_color]'
                      onClick={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </a> */}
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
