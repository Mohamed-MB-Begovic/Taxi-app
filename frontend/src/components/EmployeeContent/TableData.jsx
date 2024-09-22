/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useUser } from "../../context/UseUser";
import EmployeeModel from "./EmployeeModel";
import { useState } from "react";

export default function TableData({ emp }) {
  const { EmpData, setempData } = useUser();
  const [modelView, setModelView] = useState(false);

  const handleDelete = async (emp_id) => {
    if (!confirm("are your sure to delete ")) return;
    const previousEmp = [...EmpData];
    const updatedEmps = EmpData.filter((emp) => emp._id != emp_id);
    setempData(updatedEmps);
    // getEmp();
    try {
      const { data } = await axios.delete("/api/employee/delete-emp/" + emp_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>
        <img src={emp.image} alt={emp.emp_id} />
      </td>
      <td>{emp.emp_id}</td>
      <td>{emp.fullname}</td>
      <td>{emp.phoneNo}</td>
      <td>{emp.email}</td>
      <td>{emp.status}</td>
      <td>
        <a
          className="link edit-link"
          onClick={(e) => {
            e.preventDefault();
            setModelView(true);
          }}
        >
          {" "}
          <ion-icon name="create-outline"></ion-icon>
        </a>
        {modelView ? (
          <>
            <EmployeeModel empToEdit={emp} setModelView={setModelView} />
          </>
        ) : (
          ""
        )}
        <button
          className="link delete-link"
          onClick={() => handleDelete(emp._id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
