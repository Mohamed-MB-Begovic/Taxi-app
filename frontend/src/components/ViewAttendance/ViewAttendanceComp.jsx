/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useUser } from "../../context/UseUser";
import axios from "axios";
import './viewattendance.css'
/* eslint-disable react/no-unescaped-entities */
export default function ViewAttendanceComp() {
  const date = new Date().toISOString().split("T")[0];
  const [loading, setIsLoading] = useState();
  const [currentDate, setCurrentDate] = useState(date);
  const [ attendanceEmps,setAttendanceEmps ] =useState(null) ;
// const [choosedDate,setChoosedDate]=useState(date)
const {systemTheme } = useUser();

  const getAttendanceEmps=async (newDate)=>{
    const choosedDate=newDate ? newDate : currentDate
    try{
const {data}=await axios.get("/api/attendance/view-attendance/"+choosedDate)
data && setAttendanceEmps(data)
    }catch(error){
      console.log("error in getAttendanceEmps "+error)
    }
  }

  useEffect(() => {
    getAttendanceEmps()
  }, []);

  const handleChange = async (e) => {
    const text = e.target.value;
    const filtererdData = await attendanceEmps.filter((emp) =>
      emp.fullname.toLowerCase().includes(text)
    );
    if (filtererdData.length > 0) {
      setAttendanceEmps(filtererdData);
    }
    if (filtererdData.length === 0) {
      getAttendanceEmps();
    }
    if (!text) {
      getAttendanceEmps()
    }
  };

  function handleDateChange(e) {
    const newDate=e.target.value
      setCurrentDate(newDate)
    getAttendanceEmps(newDate);
  }

  
  return (
    <div className={`page-content ${systemTheme==="light" ?"light":"" }`}>
      <h2>View Attendance</h2>
      <div className="tabs">
      <input type="date" className="date-input" value={currentDate} onChange={handleDateChange} />
     {attendanceEmps?.length>0 ? (
       <div className="search-container">
       <ion-icon name="search-outline"></ion-icon>
       <input type="text" placeholder="search employee..." onChange={handleChange} />
     </div>
     ):""}
      </div>
      {loading ? (
        <h2>Loading......</h2>
      ) : attendanceEmps?.length === 0 ? (
        <h2 style={{ marginTop: "1rem" }}>
          {`No Employess Attendance Found in 💥💥💥
          ${currentDate === date ? "Today" : currentDate}`}
        </h2>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>#</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceEmps &&
                attendanceEmps.map((emp) => {
                  return <TableData emp={emp} key={emp._id} />;
                })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

function TableData({ emp }) {
  // const [image, setImage] = useState(emp.image);
  // const [name, setName] = useState(emp.fullname);
  // const [phoneNo, setPhoneNo] = useState(emp.phoneNo);
  // const [attendanceStatus, setAttendanceStatus] = useState("absent");


  return (
    <tr>
      <td>
        <img src={emp.image} alt="image" />
      </td>
      <td>{emp.attend_no}</td>
      <td>{emp.fullname}</td>
      <td>{emp.phoneNo}</td>
      <td>{emp.date}</td>
      <td className={`${emp.status==="present"?'present':"absent"}`}>{emp.status}</td>
    </tr>
  );
}
