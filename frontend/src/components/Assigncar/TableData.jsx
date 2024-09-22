/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { useUser } from "../../context/UseUser";
import { useState } from "react";
import AssignCarModel from "./AssignCarModel";

export default function TableData({ cars }) {
  const [modelView, setModelView] = useState(false);
  const { AssignedCars, setAssignedCars, getAssignedCars } = useUser();

  const handleDelete = async (id) => {
    if (!confirm("are your sure to delete ")) return;
    const oldCars = [...AssignedCars];
    const updatedCars = AssignedCars.filter((car) => car._id != id);
    console.log(updatedCars);
    setAssignedCars(updatedCars);
    try {
      const { data } = await axios.delete(
        "/api/assign-car/delete-assign/" + id
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td>{cars.emp_id}</td>
      <td>{cars.emp_name}</td>
      <td>{cars.type}</td>
      <td>{cars.plateNo}</td>
      <td>{cars.registeredDate}</td>
      <td>
        <button
          className="link delete-link"
          onClick={() => handleDelete(cars._id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
