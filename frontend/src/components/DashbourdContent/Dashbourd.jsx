/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./dashbourd.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { useUser } from "../../context/UseUser";
export default function DashbourdContent() {
  const [totalEmp, setTotalEmp] = useState();
  const [totalCars, setTotalCars] = useState();
  const { systemTheme } = useUser();

  const TotalEmp = async () => {
    try {
      const { data } = await axios.get("api/employee/total-emp");
      if (!data) return;
      setTotalEmp(data);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalCars = async () => {
    try {
      // console.log("object");
      const { data } = await axios.get("api/car/total-cars");
      // console.log("data is " + data);

      if (!data) return;
      setTotalCars(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    TotalEmp();
    TotalCars();
  }, []);
  return (
    <div className={`page-content ${systemTheme==="light" ?"light":"" }`}>
      <h2>Dashbourd</h2>
      <div className="boxContainer">
        <Box title="Employe's" path="people-outline" total={totalEmp} />
        <Box title="Car's" path="car-outline" total={totalCars} />
        <Box title="Payment's" path="people-outline" total="1,000,000" />
        <Box title="avialable" path="people-outline" total="1,000" />
        <Box title="avialable" path="people-outline" total="1,000" />
      </div>
    </div>
  );
}
function Box({ title, path, total }) {
  return (
    <div className="box">
      <ion-icon name={path}></ion-icon>
      <div className="info">
        <p>{title}</p>
        <h3>{total ? total : "0"}</h3>
      </div>
    </div>
  );
}
