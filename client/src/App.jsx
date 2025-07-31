import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import MakePayment from "./Pages/MakePayment";
import GotoPaymentPage from "./Pages/GotoPaymentPage";
import TypesOfPayment from "./Pages/TypesOfPayment";
import CreateItem from "./Pages/CreateItem";
import SignIn from "./Pages/SignIn";
import AdminPrivate from "./compponents/AdminPrivate";
import Page from "./Pages/Page";
import CreateAccount from "./Pages/CreateAccount";
import SignUp from "./Pages/SignUp";
import GeneratePaymentDetails from "./Pages/GeneratePaymentDetails";
import TransanctionVerification from "./Pages/TransanctionVerification";
import UploadSuccessful from "./Pages/UploadSuccessful";
import Download from "./Pages/Download";
import Testing from "./Pages/Testing";
import Home from "./Pages/Home";
import { AnimatePresence } from "framer-motion";
import Pay from "./Pages/Pay";
import PrivateRoute from "./compponents/PrivateRoute";

function App() {
  return (
    <>
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/pay/:price' element={<MakePayment />} /> */}
            <Route path='/pay' element={<Pay />} />
            <Route path='/payment-types' element={<TypesOfPayment />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/test' element={<Testing />} />
            <Route
              path='/generate-payment-details'
              element={<GeneratePaymentDetails />}
            />
            <Route
              element={<TransanctionVerification />}
              path='/verify/:reference'
            />
            <Route
              path='/verify-success/:reference'
              element={<UploadSuccessful />}
            />
            <Route path='/download' element={<Download />} />
            {/* <Route path='/register' element={<CreateAccount />} /> */}

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Page />} />
              <Route path='/create-item' element={<CreateItem />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
