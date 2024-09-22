/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useUser } from "../../context/UseUser";
import TableData from "./TableData";

export default function Table() {
  const { AssignedCars } = useUser();
  return (
    <table className="table emp-table">
      <thead>
        <tr>
          <th>EmpID</th>
          <th>EmpName</th>
          <th>CarType</th>
          <th>PlateNo</th>
          <th>RegisteredDate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {AssignedCars &&
          AssignedCars.map((cars) => {
            return <TableData cars={cars} key={cars._id} />;
          })}
      </tbody>
    </table>
  );
}
