import { FaCheckCircle, FaPrint } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function UploadSuccessful() {
  const referenceSlug = useParams();
  const [paymentData, setPaymentData] = useState([]);
  const receiptRef = useRef();

  useEffect(() => {
    const fetchReferenceDetails = async () => {
      const reference = referenceSlug.reference;
      if (!reference) return;

      try {
        const res = await fetch(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer sk_test_1d3f0d7cd61c3a8476b995c7b0597daa67eb2d2f",
              "Content-Type": "application/json",
            },
          }
        );
        const json = await res.json();
        if (json.status) {
          setPaymentData(json.data);
        } else {
          setError(json.message || "Verification failed");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchReferenceDetails();
  }, [referenceSlug.reference]);

  const handleDownload = async () => {
    const element = receiptRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    pdf.save(
      `receipt-${
        paymentData?.customer?.email?.replace("@gmail.com", "") || Date.now()
      }.pdf`
    );
  };
  return (
    <motion.div
      ref={receiptRef}
      className=' min-h-screan bg-[#f1f7f3] p-5 mx-auto max-w-[21rem] '
      initial={{ width: 0 }}
      animate={{ width: "" }}
      transition={{ duration: 0.2 }}>
      <div className='bg-white border mt-5 shadow rounded-xl px-3 py-5'>
        <div className='  flex justify-center px-'>
          <div
            className='  rounded-full w-[5rem] h-[5rem] flex 
          justify-center items-center shadow border'>
            <FaCheckCircle className=' text-green-600  w-[5rem] h-[5rem] ' />
          </div>
        </div>

        <div className='w-full border mt-7'></div>
        <div className='customer-details flex justify-between  py- mt-7'>
          <div className='left flex flex-col gap-5'>
            <p className=' font-semibold text-sm'>Reference Number</p>
            <p className=' font-semibold text-sm'>Matric Number</p>
            <p className=' font-semibold text-sm'>Item Name</p>
            <p className=' font-semibold text-sm'> Amount</p>
            <p className=' font-semibold text-sm'>Transaction Date & Time</p>
          </div>
          <div className='right text-slate-600 flex flex-col gap-5'>
            <p className=' font-semibold text-sm text-end'>
              {paymentData.reference || "NaN"}
            </p>
            <p className=' font-semibold text-sm text-end'>
              {paymentData.customer?.email?.replace("@gmail.com", "") || "NaN"}
            </p>
            <p className=' font-semibold text-sm text-end'>Item Name</p>
            <p className=' font-semibold text-sm text-end'>
              {" "}
              ₦{(paymentData.amount / 100).toFixed(2) || "NaN"}
            </p>
            <p className=' font-semibold text-xs text-slate-600 text-end'>
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>
        <div className='w-full border mt-7'></div>
        <div className=' mt-10 flex justify-end px-7'>
          {/* <button className=' bg-[#4a6352] text-white w-[6rem] outline-none py-2'>
            Print
          </button> */}
          <button
            className=' bg-[#4a6352] rounded-3xl w-[3rem] h-[3rem] flex 
          justify-center items-center shadow'
            onClick={handleDownload}>
            <FaPrint className=' text-white h-6 w-6  ' />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
