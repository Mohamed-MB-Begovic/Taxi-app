/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import DashbourdContent from "../components/DashbourdContent/Dashbourd";
import "./css/dashbourd.css";
// import { useUser } from "../context/UseUser";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
export default function Dashbourd() {
  // const { user } = useUser();

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="page page-dashbourd">
      <Header />
      <Sidebar />
      <DashbourdContent />
    </div>
  );
}
