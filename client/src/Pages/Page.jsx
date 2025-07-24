import Sidebar from "../compponents/Sidebar/Sidebar";
import Dashboard from "../compponents/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashTransactions from "../compponents/DashTransactions";
import DashPaidStudents from "../compponents/DashPaidStudents";
import DashProfile from "../compponents/DashProfile";
export default function Home() {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const tabParams = new URLSearchParams(location.search);
    const tabFromURL = tabParams.get("tab");

    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);
  // const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className='grid gap-4 p- lg:grid-cols-[250px,_1fr]
      sm:grid-cols-[200px,_1fr]
      '
      initial={{ width: 0 }}
      animate={{ width: "" }}
      transition={{ duration: 0.2 }}

      // initial={{ height: 1, opacity: 0 }}
      // animate={{ height: 1, opacity: 1 }}
      // transition={ { duration: 6 } }
    >
      <Sidebar />
      <div className=''>
        {tab === "overview" && <Dashboard />}
        {tab === "transactions" && <DashTransactions />}
        {tab === "paid-students" && <DashPaidStudents />}
        {tab === "profile" && <DashProfile />}
      </div>
    </div>
  );
}

{
  /* <div
  className='grid gap-4 p-4 
lg:grid-cols-[220px,_1fr] sm:grid-cols-[200px,_1fr]'>
  <Sidebar />
  <Dashboard />
</div>; */
}
