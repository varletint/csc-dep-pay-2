import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaCheckCircle, FaPrint, FaRegCheckCircle } from "react-icons/fa";

export default function GenerateReceipt() {
  const [paymentData, setPaymentData] = useState([]);
  const referenceSlug = useParams();
  const receiptRef = useRef();

  const fetchCallback = useCallback(async () => {
    // const fetchPaymentDetails =  () => {
    const reference = referenceSlug.reference;
    const res = await fetch(`/api/item/generate-receipt/${reference}`);
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    setPaymentData(data[0]);
    console.log(data);
    // };
    // fetchPaymentDetails();
  }, []);

  useEffect(() => {
    fetchCallback();
  }, [fetchCallback]);

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

    pdf.save(`receipt-${paymentData.matricNumber || Date.now()}.pdf`);
  };
  return (
    <div
      className=' min-h-screan bg-[#f1f7f3] p-5 mx-auto max-w-[21rem] '
      //       initial={{ width: 0 }}
      //       animate={{ width: "" }}
      // transition = {{ duration: 0.2; }}
    >
      <div className='bg-white border mt-5 shadow px-3 py-5' ref={receiptRef}>
        <div className='  flex justify-center px-'>
          <div
            className='  rounded-full w-[4rem] h-[4rem] flex 
          justify-center items-center shadow border'>
            <FaRegCheckCircle className=' text-green-600  w-[4rem] h-[4rem] ' />
          </div>
        </div>

        <div className='w-full border mt-7'></div>
        <div className='customer-details flex justify-between  py- mt-7'>
          <div className='left flex flex-col gap-1'>
            <p className=' font-semibold text-sm'>Reference Number</p>
            <p className=' font-semibold text-sm'>Matric Number</p>
            <p className=' font-semibold text-sm'>Item Name</p>
            <p className=' font-semibold text-sm'> Amount</p>
            <p className=' font-semibold text-sm'>Transaction Date & Time</p>
          </div>
          <div className='right text-slate-600 flex flex-col gap-1'>
            <p className=' font-semibold text-sm text-end'>
              {paymentData.reference || "NaN"}
            </p>
            <p className=' font-semibold text-sm text-end uppercase'>
              {paymentData.matricNumber || "NaN"}
            </p>
            <p className=' font-semibold text-sm text-end'>
              {paymentData.itemName || "No item name"}
            </p>
            <p className=' font-semibold text-sm text-end'>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(paymentData.amount) || "NaN"}
            </p>
            <p className=' font-semibold text-xs text-slate-600 text-end'>
              {new Date(paymentData.paidAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className='w-full border mt-7'></div>
        <div className=' mt-10'>
          {/* <button className=' bg-[#4a6352] text-white w-[6rem] outline-none py-2'>
            Print
          </button> */}

          <p
            className=' text-sm text-center 
          text-slate-400'>
            Computer Science Department
          </p>
        </div>
      </div>
      <p
        className=' p-2 text-right underline hover:cursor-pointer'
        onClick={handleDownload}>
        Print your Receipt
        {/* <FaPrint className=' text-white h-6 w-6  ' /> */}
      </p>
    </div>
  );
}
