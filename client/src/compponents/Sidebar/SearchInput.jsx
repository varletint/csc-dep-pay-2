import { set } from "mongoose";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [searchData, setSearchData] = useState("");
  console.log(searchData);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromURL = searchParams.get("searchTerm") || "";
    if (searchTermFromURL) setSearchData(searchTermFromURL);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    if (searchData) {
      urlParams.set("searchTerm", searchData);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    } else {
      urlParams.delete("searchTerm");
    }
    // const form = e.target;
    // const searchTerm = form.search.value.trim();
    // if (searchTerm) {
    //   const encodedSearchTerm = encodeURIComponent(searchTerm);
    //   window.location.href = `/dashboard?tab=transactions&searchTerm=${encodedSearchTerm}`;
    // } else {
    //   window.location.href = `/dashboard?tab=transactions`;
    // }
  };

  return (
    <>
      <div
        className='bg-[#ddebe0] mb-4 relative 
      rounded px-2 py-1.5 text-sm'>
        <div className='flex gap-1.5 px-2 items-center text-[#8aa197]'>
          <FaSearch />
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='search'
              onChange={(e) => setSearchData(e.target.value)}
              placeholder='Search'
              className='w-full border-none bg-transparent 
            placeholder:text-[#8aa197]
            focus:outline-none'
              id='search'
            />
          </form>
        </div>
      </div>
    </>
  );
}
