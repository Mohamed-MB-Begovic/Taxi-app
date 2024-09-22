/* eslint-disable react-hooks/exhaustive-deps */
// import { useNavigate } from "react-router-dom";
import AssignCarContent from "../components/Assigncar/AssignCarContent";
import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
// import { useUser } from "../context/UseUser";
// import { useEffect } from "react";

export default function AsignCar() {
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
      <AssignCarContent />
    </div>
  );
}
