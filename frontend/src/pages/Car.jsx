/* eslint-disable react-hooks/exhaustive-deps */
// import { useNavigate } from "react-router-dom";
import CarContent from "../components/CarsContent/CarContent";
import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
// import { useUser } from "../context/UseUser";
// import { useEffect } from "react";

export default function Car() {
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
      <CarContent />
    </div>
  );
}
