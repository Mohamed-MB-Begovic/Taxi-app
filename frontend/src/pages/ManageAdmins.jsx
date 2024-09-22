/* eslint-disable react-hooks/exhaustive-deps */
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import ManageAdminsContent from "../components/ManageAdmins/ManageAdminsContent";
import Sidebar from "../components/sidebar/Sidebar";
// import { useUser } from "../context/UseUser";
// import { useEffect } from "react";
export default function ManageAdmins() {
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
      <ManageAdminsContent />
    </div>
  );
}
