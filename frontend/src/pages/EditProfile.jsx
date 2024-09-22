/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Editprofile from "../components/Editprofile/Editprofile";
import "./css/dashbourd.css";
// import { useUser } from "../context/UseUser";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
export default function EditProfile() {
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
      <Editprofile />
    </div>
  );
}
