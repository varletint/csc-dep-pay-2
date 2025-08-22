import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPaidStudents() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPurchasedItems, setUserPurchasedItems] = useState([]);
  const [totalStudents, setTotlStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(userPurchasedItems);
  useEffect(() => {
    document.title = "Dashboard";
    const fetchUserItems = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/students/get-students`);
      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        alert(data.message);
        return;
      }
      setIsLoading(false);
      setUserPurchasedItems(data.userWithOutPassword);
      setTotlStudents(data.totalUsers);
    };
    fetchUserItems();
  }, []);
  if (isLoading)
    return (
      <p className=' flex justify-center mt-10 min-h-screen text-lg '>
        Loading...
      </p>
    );

  return (
    <div className='bg-white  pt-4 min-h-[100vh] shadow '>
      <div className=' gap-3 px-4 grid'>
        <div
          className='grid-cols-1 p-4 border 
  shadow-sm rounded-xl lg:overflow-hidden overflow-x-scroll scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300 '>
          <div className='sticky mb-4 flex items-center justify-between'>
            <h3
              className='flex items-center gap-1.5
         font-medium'>
              Students List ({totalStudents})
            </h3>
            <button
              className='text-sm text-green-500
              hover:underline font-medium'>
              See all
            </button>
          </div>
          <table className=' w-full table-row'>
            <TableHead />
            <tbody>
              {!isLoading && userPurchasedItems.length === 0 && (
                <p className=' text-sm text-red-500'>
                  No trasactions have been made yet
                </p>
              )}
              {userPurchasedItems.length > 0 &&
                userPurchasedItems.map((item) =>
                  item ? (
                    <TableRow
                      key={item._id}
                      matric={item.matricNumber}
                      item={item.name}
                      link={`/dashboard?tab=student_tranx&userId=${item._id}`}
                      date={new Date(item.createdAt).toLocaleDateString()}
                    />
                  ) : (
                    <p key={"no item"}>
                      You have not <strong>purchased any item</strong>
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
      <tr className=' text-xs font-normal bg-gray-100 text-stone-500'>
        <th className='text-start p-1.5 '>Matric number</th>
        <th className='text-start p-1.5 '>Fullname</th>
        <th className='text-start p-1.5'>Date</th>
        <th className='w-8'></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ matric, category, date, amount, item, link }) => {
  return (
    <tr className='text-[0.73rem] font-medium text-stone-700'>
      <td className='p-1.5 uppercase whitespace-nowrap'>{matric}</td>
      <td className='p-1.5 capitalize whitespace-nowrap'>{item}</td>
      <td className='p-1.5 whitespace-nowrap'>{date}</td>
      <td className='p-1.5'>{amount}</td>
      <td className='p-1.5'>
        <Link to={link} className=' underline text-blue-500'>
          View
        </Link>
      </td>
    </tr>
  );
};
