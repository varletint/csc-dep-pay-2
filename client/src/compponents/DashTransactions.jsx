import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashTransactions() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);
  console.log(userPurchasedItems);
  useEffect(() => {
    const fetchUserItems = async () => {
      const res = await fetch(`/api/item/purchased-items/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setUserPurchasedItems(data);
    };
    fetchUserItems();
  }, []);
  return (
    <div className='bg-white rounded-lg pt-4 min-h-[100vh] shadow '>
      <div className=' gap-3 px-4 grid'>
        {/* <RecentTransactions /> */}

        <div
          className='grid-cols-1 p-4 border 
  shadow-sm rounded-xl lg:overflow-hidden overflow-x-scroll scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300 '>
          <div className='sticky mb-4 flex items-center justify-between'>
            <h3
              className='flex items-center gap-1.5
         font-medium'>
              Recent Transactions
            </h3>
            <button
              className='text-sm text-green-500
              hover:underline font-medium'>
              See all
            </button>
          </div>
          <table className=' w-full table-auto'>
            <TableHead />
            <tbody>
              {/* <TableRow
                matric={"u20/fns/csc/1110"}
                item={"Manual 403"}
                category={"Manuals and Books"}
                amount={1200}
                date={"12/06/2025"}
              /> */}
              {userPurchasedItems.length > 0 &&
                userPurchasedItems.map((item) =>
                  item ? (
                    // <option key={item._id}>{item.itemName}</option>
                    <TableRow
                      key={item._id}
                      matric={item.matricNumber}
                      item={item.itemName}
                      // category={item.category}
                      amount={item.amount}
                      date={new Date(item.createdAt).toLocaleDateString()}
                    />
                  ) : (
                    <p key={"no item"}>
                      You have <strong>purchased any item</strong>
                    </p>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const TableHead = () => {
  return (
    <thead>
      <tr className=' text-sm font-normal text-stone-500'>
        <th className='text-start p-1.5 '>Matric NO</th>
        <th className='text-start p-1.5 '>Item</th>
        {/* <th className='text-start p-1.5 '>Category</th> */}
        <th className='text-start p-1.5'>Date</th>
        <th className='text-start p-1.5'>Amount</th>
        <th className='w-8'></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ matric, category, date, amount, item }) => {
  return (
    <tr className='text-[0.73rem] font-medium text-stone-700'>
      <td className='p-1.5 uppercase whitespace-nowrap'>{matric}</td>
      <td className='p-1.5 capitalize whitespace-nowrap'>{item}</td>
      <td className='p-1.5 capitalize whitespace-nowrap'>{category}</td>
      <td className='p-1.5 whitespace-nowrap'>{date}</td>
      <td className='p-1.5'>
        {" "}
        <span className='line-through whitespace-nowrap'>N</span>
        {amount}
      </td>
    </tr>
  );
};
