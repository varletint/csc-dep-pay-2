import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import TypesOfPayment from "./Pages/TypesOfPayment";
import CreateItem from "./Pages/CreateItem";
import SignIn from "./Pages/SignIn";
import Page from "./Pages/Page";
import SignUp from "./Pages/SignUp";
import UploadSuccessful from "./Pages/UploadSuccessful";
import Testing from "./Pages/Testing";
import Home from "./Pages/Home";
import { AnimatePresence } from "framer-motion";
import Pay from "./Pages/Pay";
import PrivateRoute from "./compponents/PrivateRoute";
import GenerateReceipt from "./Pages/GenerateReceipt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./Pages/PageNotFound";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss
      />
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pay' element={<Pay />} />
            <Route path='/payment-types' element={<TypesOfPayment />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/test' element={<Testing />} />
            <Route path='*' element={<PageNotFound />} />
            <Route
              path='/generate_receipt/:reference'
              element={<GenerateReceipt />}
            />

            <Route
              path='/verify-success/:reference'
              element={<UploadSuccessful />}
            />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Page />} />
              <Route path='/create-item' element={<CreateItem />} />
              <Route path='/search' element={<SearchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
