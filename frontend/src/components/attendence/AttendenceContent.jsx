/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UseUser";
import toast from "react-hot-toast";

import "./attendence.css";
// import { useState } from "react";
// import TableData from "./TableData";
export default function AttendenceContent() {
  // const { getattendanceEmp } = useUser();
  const [loading, setIsLoading] = useState(false);
  const date = new Date().toISOString().split("T")[0];
  const [attendanceEmps, setAttendanceEmps] = useState(null);
  const [attendanceSubmit,setAttendanceSubmit]=useState(false)
  const { systemTheme} = useUser();

  const [selectedEmps,setSelectedEmps]=useState([])
  const getattendanceEmp = async () => {
    try {
  
      const { data } = await axios.get("/api/attendance/get-attendance");
      // console.log(data);
      {
        data && setAttendanceEmps(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const date=new Date().toLocaleDateString();
    setIsLoading(true);
    const lastChecked=localStorage.getItem("lastChecked")
    if(lastChecked===date){
      setAttendanceSubmit(true)
      setIsLoading(false)
    }
    getattendanceEmp();

    setIsLoading(false);
  });

  const handleSubmit = () => {
    const date=new Date().toLocaleDateString();
    if (selectedEmps.length === 0) {
      toast.error("no selected emp");
    } else {
      try {
        const { data } = axios.post("/api/attendance/register", selectedEmps);
        toast.success("Employee Attendance Checked");
        localStorage.setItem("lastChecked",date)
        setAttendanceSubmit(true)
      } catch (error) {
        console.log(`error in ${error}`);
      }
    }
  };
  
  return (
    <div className={`page-content ${systemTheme==="light" ?"light":""}`}>
      <h2>Attendance</h2>
      {attendanceSubmit ?<h2 className="today">today attendance was checked <span>✔✔✔</span> </h2>:""}
      {loading ? (
        <h2>Loading......</h2>
      ) : attendanceEmps?.length === 0 ? (
        <h2 style={{ marginTop: "1rem" }}>No Employess Found💥💥💥</h2>
      ) : (
        <>
          <table className={`table ${attendanceSubmit ? "display":""}`}>
            <thead>
              <tr>
                <th>Image</th>
                <th>FullName</th>
                <th>PhoneNo</th>
                <th>Email</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceEmps &&
                attendanceEmps.map((emp) => {
                  return (
                    <TableData
                      emp={emp}
                      key={emp._id}
                      selectedEmps={selectedEmps}
                    />
                  );
                })}
            </tbody>
          </table>
          <button className={`btn ${attendanceSubmit ? "display":""}`} onClick={handleSubmit}>
            Take Attendance
          </button>
        </>
      )}
    </div>
  );
}

function TableData({ emp, selectedEmps }) {
  // console.log(emp);
  // const { attendanceEmps, setAttendanceEmps } = useUser();
  const [image, setImage] = useState(emp.image);
  const [name, setName] = useState(emp.fullname);
  const [phoneNo, setPhoneNo] = useState(emp.phoneNo);
  const [email, setEmail] = useState(emp.email);
  const [id, setId] = useState(emp._id);
  // const [attendanceStatus, setAttendanceStatus] = useState("absent");
  const [check, setCheck] = useState(false);
  const formdata = new FormData();
  formdata.append("employee", id);
  formdata.append("image", image);
  formdata.append("fullname", name);
  formdata.append("phoneNo", phoneNo);
  const obj = Object.fromEntries(formdata.entries());
  
  const handleCheck = (e) => {
    setCheck(!check);
    if (!check === true) {
      selectedEmps.pop(obj);
    } else {
      selectedEmps.push(obj)
    }
  };

  useEffect(() => {
    setCheck(!check);
  }, []);

  return (
    <tr>
      <td>
        <img src={emp.image} alt="image" />
      </td>
      <td>{emp.fullname}</td>
      <td>{emp.phoneNo}</td>
      <td>{emp.email}</td>

      <td>
        <input
          type="checkbox"
          className="checklist"
          value={obj}
          onChange={handleCheck}
        />
      </td>
    </tr>
  );
}
