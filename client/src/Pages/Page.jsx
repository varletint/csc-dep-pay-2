import Sidebar from "../compponents/Sidebar/Sidebar";
import Dashboard from "../compponents/Dashboard/Dashboard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashTransactions from "../compponents/DashTransactions";
import DashPaidStudents from "../compponents/DashPaidStudents";
import DashProfile from "../compponents/DashProfile";
import DashStudentTransactions from "../compponents/DashStudentTransactions";
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

  return (
    <div
      className='grid gap-4 p- lg:grid-cols-[250px,_1fr]
      sm:grid-cols-[200px,_1fr] 
      '
      initial={{ width: 0 }}
      animate={{ width: "" }}
      transition={{ duration: 0.2 }}>
      <Sidebar />

      <div className=''>
        {tab === "overview" && <Dashboard />}
        {tab === "transactions" && <DashTransactions />}
        {tab === "paid-students" && <DashPaidStudents />}
        {tab === "profile" && <DashProfile />}
        {tab === "student_tranx" && <DashStudentTransactions />}
      </div>
    </div>
  );
}
