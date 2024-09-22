/* eslint-disable react-hooks/exhaustive-deps */
import "./manageadmins.css";
import { useEffect } from "react";
import { useUser } from "../../context/UseUser";
import Table from "./Table";
export default function ManageAdminsContent() {
  const { getAdmins, admins } = useUser();
  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className="page-content">
      <h2>Admins</h2>
      {admins && admins.length === 0 ? "" : <Table />}
    </div>
  );
}
