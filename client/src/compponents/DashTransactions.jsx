import React, { useEffect, useState } from "react";
import RecentTransactions from "./Dashboard/RecentTransactions";

export default function DashTransactions() {
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);
  useEffect(() => {
    const fetchUserItems = async () => {
      const res = await fetch(
        `/api/item/purchased-items/U22/fns/csc/2131@gmail.com`
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setUserPurchasedItems(data.items);
    };
    fetchUserItems();
  }, [userPaymentItems]);
  return (
    <div className='bg-white rounded-lg pt-4 min-h-[100vh] shadow '>
      <div className=' gap-3 px-4 grid'>
        <RecentTransactions />
      </div>
    </div>
  );
}
