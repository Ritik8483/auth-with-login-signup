import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const Dashboard = lazy(() => import("./components/pages/Dashboard"));
const ViewEmployee = lazy(() => import("./components/pages/ViewEmployee"));


function App() {
  const localStoreData = JSON.parse(
    localStorage.getItem("userCredentials") || "{}"
  );
  const reduxState = useSelector(
    (state: any) => state?.AuthUserSliceReducer?.token
  );
  console.log("localStoreData", localStoreData.token);
  console.log("reduxState", reduxState);

  return (
    <div className="">
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            {/* {
              localStoreData.token || reduxState ? (<> */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/view/:id" element={<ViewEmployee />} />
             

              {/* </>) : <Route path="login" element={<Navigate to='login' replace />} />
            } */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </BrowserRouter>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
