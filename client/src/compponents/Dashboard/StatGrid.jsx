import React, { useEffect, useState } from "react";

export default function StatGrid() {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchAllTranstionsAmount = async () => {
      try {
        const response = await fetch(`api/webhook/all_transactions`);
        const data = await response.json();
        setTransactions(data);
        const total = transactions.payments.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchAllTranstionsAmount();
  }, []);
  return (
    <>
      <Card
        title={"Total Amount"}
        value={
          new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(totalAmount) || "NaN"
        }
      />
      <Card
        title={"Number of payers"}
        period={"Last 30 days"}
        value={transactions.lastMonthPayments}
      />
      <Card
        title={"Total number of transactions"}
        value={transactions.totalPayments || "NaN"}
      />
    </>
  );
}

const Card = ({ title, value, pillText, trend, period }) => {
  return (
    <div className=' p-4 bg-[#f1f7f3] col-span-4 rounded-xl shadow'>
      <div className='flex mb-8 items-start justify-between'>
        <div className=''>
          <h3 className='text-[#4a6352] mb-1 text-xs font-semibold'>{title}</h3>
          <p className='text-xl font-bold'>
            <span className=' line-through'></span>
            {value}
          </p>
        </div>
      </div>
      <p className='text-xs font-semibold text-[#92ac9a] '>{period}</p>
    </div>
  );
};
