import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState([]);
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

  return <div>SearchPage</div>;
}
