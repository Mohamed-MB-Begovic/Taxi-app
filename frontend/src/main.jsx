import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashbourd from "./pages/Dashbourd.jsx";
import Car from "./pages/Car.jsx";
import Employee from "./pages/Employee.jsx";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UseUser.jsx";
import Payment from "./pages/Payment.jsx";
import AssignCar from "./pages/AsignCar.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import AdminDashbourd from "./pages/AdminDashbourd.jsx";
import ManageAdmins from "./pages/ManageAdmins.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Attendence from "./pages/Attendence.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ViewAttendance from "./pages/ViewAttendance.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashbourd", element: <Dashbourd /> },
  { path: "/cars", element: <Car /> },
  { path: "/employee", element: <Employee /> },
  { path: "/payments", element: <Payment /> },
  { path: "/assigncar", element: <AssignCar /> },
  { path: "/manage-users", element: <ManageUsers /> },
  { path: "/manage-admins", element: <ManageAdmins /> },
  { path: "/admin-dashbourd", element: <AdminDashbourd /> },
  { path: "/edit-profile", element: <EditProfile /> },
  { path: "/attendence", element: <Attendence /> },
  { path: "/view-attendance", element: <ViewAttendance /> },
  { path: "*", element: <PageNotFound /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
