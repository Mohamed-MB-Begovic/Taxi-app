/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import EmployeeContent from "../components/EmployeeContent/EmployeeContent";
// import { useUser } from "../context/UseUser";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
export default function Employee() {
  // const { user } = useUser();

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="page page-employee">
      <Header />
      <Sidebar />
      <EmployeeContent />
    </div>
  );
}
