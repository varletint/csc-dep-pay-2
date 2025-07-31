import React, { useEffect, useState } from "react";
import RecentTransactions from "./Dashboard/RecentTransactions";
import { useSelector } from "react-redux";

export default function DashTransactions() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);
  useEffect(() => {
    const fetchUserItems = async () => {
      const res = await fetch(`/api/item/purchased-items/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setUserPurchasedItems(data.items);
    };
    fetchUserItems();
  }, []);
  return (
    <div className='bg-white rounded-lg pt-4 min-h-[100vh] shadow '>
      <div className=' gap-3 px-4 grid'>
        <RecentTransactions />
      </div>
    </div>
  );
}
