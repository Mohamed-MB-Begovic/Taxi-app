/* eslint-disable react-hooks/exhaustive-deps */
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import ManageUser from "../components/ManageUserContent/ManageUser";
import Sidebar from "../components/sidebar/Sidebar";
// import { useUser } from "../context/UseUser";
// import { useEffect } from "react";

export default function ManageUsers() {
  // const { user } = useUser();

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="page">
      <Header />
      <Sidebar />
      <ManageUser />
    </div>
  );
}
