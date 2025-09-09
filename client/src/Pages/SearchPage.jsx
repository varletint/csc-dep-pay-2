import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchInput from "../compponents/Sidebar/SearchInput";
import Sidebar from "../compponents/Sidebar/Sidebar";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchData = urlParams.get("searchTerm");

    if (searchData) {
      fetchData(searchData);
    }
  }, [location.search]);

  const fetchData = async (searchTerm) => {
    try {
      const res = await fetch(
        `/api/webhook/transactions_?searchTerm=${searchTerm}`
      );

      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        const searchedQueries = data.searchedQueries;

        if (searchedQueries.length === 0) {
          toast.error("Item not found");
        }
        setSearchQuery(searchedQueries);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className='grid gap-4 p- lg:grid-cols-[250px,_1fr]
      sm:grid-cols-[200px,_1fr]'>
      <Sidebar />
      <div className='bg-white  pt-4 min-h-[100vh] shadow '>
        <div className=' gap-3 px-4 grid'>
          <div
            className='grid-cols-1 p-4 border 
  shadow-sm rounded-xl lg:overflow-hidden overflow-x-scroll scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300 carousel '>
            <div className='sticky mb-4 flex items-center justify-between'>
              <h3
                className='flex items-center gap-1.5
         font-medium'>
                {searchQuery.length}
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
                {!isLoading && searchQuery.length === 0 && (
                  <p className=' text-sm text-red-500'>No item found</p>
                )}
                {searchQuery.length > 0 &&
                  searchQuery.map((item) =>
                    item ? (
                      <TableRow
                        key={item._id}
                        matric={item.matricNumber}
                        item={item.studentName}
                        reference={item.reference}
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
      </div>{" "}
    </div>
  );
}

const TableHead = () => {
  return (
    <thead>
      <tr className=' text-xs font-normal bg-gray-100 text-stone-500'>
        <th className='text-start p-1.5 '>Matric number</th>
        <th className='text-start p-1.5 '>Fullname</th>
        <th className='text-start p-1.5 '>Reference</th>
        <th className='text-start p-1.5'>Date</th>
        <th className='w-8'></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  matric,
  category,
  date,
  amount,
  item,
  link,
  reference,
}) => {
  return (
    <tr className='text-[0.73rem] font-medium text-stone-700'>
      <td className='p-1.5 uppercase whitespace-nowrap'>{matric}</td>
      <td className='p-1.5 capitalize whitespace-nowrap'>{item}</td>
      <td className='p-1.5 capitalize whitespace-nowrap'>{reference}</td>
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
