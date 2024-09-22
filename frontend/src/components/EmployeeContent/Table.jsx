/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UseUser";
import TableData from "./TableData";
import { useState } from "react";

export default function Table({ records }) {
  const { EmpData, setempData, getEmp } = useUser();
  const [searchData, setSearchData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      <table className="table emp-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>FullName</th>
            <th>Phone No</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((emp) => {
              return <TableData emp={emp} empToEdit={emp} key={emp._id} />;
            })}
        </tbody>
      </table>
    </>
  );
}
