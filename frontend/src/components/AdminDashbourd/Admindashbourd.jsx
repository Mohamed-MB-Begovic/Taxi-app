/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UseUser";

/* eslint-disable react/prop-types */
export default function Admindashbourd() {
  const [totalUsers, setTotalUsers] = useState();
  const [totalAdmins, setTotalAdmins] = useState();
  const { systemTheme} = useUser();

  const TotalUsers = async () => {
    try {
      const { data } = await axios.get("api/user/total-users");
      if (!data) return;
      setTotalUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const TotalAdmins = async () => {
    try {
      const { data } = await axios.get("api/user/total-admins");
      if (!data) return;
      setTotalAdmins(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    TotalUsers();
    TotalAdmins();
  }, []);
  return (
    <div className={`page-content ${systemTheme==="light" ?"light":""}`}>
      <div className="boxContainer">
        <Box title="Users" path="people-outline" total={totalUsers} />
        <Box title="Admins" path="person-circle-outline" total={totalAdmins} />
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
