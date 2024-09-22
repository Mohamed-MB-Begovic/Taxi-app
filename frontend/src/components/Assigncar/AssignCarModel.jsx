/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../../context/UseUser";
export default function AssignCarModel({ setModelview, assignToEdit }) {
  const { getAssignedCars, EmpData } = useUser();
  const [emp, setEmp] = useState(null);
  const [car, setCar] = useState(null);
  const [name, setName] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registeredDate, setRegisteredDate] = useState("");
  const [emp_id, set_emp_id] = useState();
  const [car_id, set_car_id] = useState("");
  const [car_type, set_car_type] = useState("");
  const [emp_to_update, set_emp_to_update] = useState();
  const [car_to_update, set_car_to_update] = useState();

  const isEditing = assignToEdit != null;

  // employee

  const getEmp = async () => {
    try {
      const { data } = await axios.get("/api/employee/idle-emp");
      if (!data) return toast.error("fetch error");
      setEmp(data);
    } catch (error) {
      console.log("error in get emp data " + error);
    }
  };
  const chooseOption = async (e) => {
    let id = e.target.value;
    if (id === "") {
      return toast.error("please choose employee");
    } else {
      set_emp_id(id);
    }
    try {
      const { data } = await axios.get("/api/employee/find-emp/" + Number(id));
      setName(data[0].fullname);
      set_emp_to_update(data[0]._id);
    } catch (error) {
      console.log("errror " + error);
    }
  };
  const updateEmp = async () => {
    // console.log(EmpData);
    try {
      const { data } = await axios.post(
        "/api/employee/update-emp-status/" + emp_to_update
      );
      console.log("update happend");
    } catch (error) {
      console.log(error);
    }
  };
  // car
  const getCar = async () => {
    try {
      const { data } = await axios.get("/api/car/idle-car");
      // console.log("data" + data);
      if (!data) return toast.error("fetching error");
      setCar(data);
    } catch (error) {
      console.log("error in get car data " + error);
    }
  };
  const chooseCar = async (e) => {
    let id = e.target.value;
    if (id === "") {
      toast.error("please choose car");
    }
    set_car_id(id);
    // console.log("choose option");
    try {
      const { data } = await axios.get("/api/car/find-car/" + Number(id));
      // console.log(data[0].plateNo);
      setPlateNo(data[0].plateNo);
      set_car_type(data[0].type);
      set_car_to_update(data[0]._id);
    } catch (error) {
      console.log("errror " + error);
    }
  };
  const updateCar = async () => {
    try {
      const { data } = await axios.post(
        "/api/car/update-car-status/" + car_to_update
      );
      console.log("update happend");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("emp_id", emp_id);
    formdata.append("name", name);
    formdata.append("car_id", car_id);
    formdata.append("type", car_type);
    formdata.append("plateNo", plateNo);
    formdata.append("registeredDate", registeredDate);
    const obj = Object.fromEntries(formdata.entries());
    try {
      setIsLoading(true);
      const response = await axios.post("/api/assign-car/register", obj);
      setModelview(false);
      setIsLoading(false);
      toast.success("added sucessfully");
      getAssignedCars();
      updateEmp();
      updateCar();
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getEmp();
    getCar();
  }, []);

  return (
    <div className="add-user-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">EmployeeId</label>
          <select name="" id="" onChange={chooseOption}>
            {emp &&
              emp.map((emp) => {
                return (
                  <>
                    <option value="">choose employee id</option>
                    <option value={emp.emp_id} key={emp.emp_id}>
                      {emp.emp_id}
                    </option>
                  </>
                );
              })}
          </select>
        </div>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" value={name ? name : ""} disabled  required/>
        </div>
        <div>
          <label htmlFor="">Car_ID</label>
          <select name="" id="" onChange={chooseCar}>
            {car &&
              car.map((car) => {
                return (
                  <>
                    <option value="">choose car id</option>
                    <option value={car.car_id} key={car.car_id}>
                      {car.car_id}
                    </option>
                  </>
                );
              })}
          </select>
        </div>
        <div>
          <label htmlFor="">Plate_No</label>
          <input type="text" value={plateNo ? plateNo : ""} required disabled />
        </div>
        <div>
          <label htmlFor="">Date registered</label>
          <input
            type="date"
            value={registeredDate}
            onChange={(e) => setRegisteredDate(e.target.value)}
          />
        </div>

        <button
          className="close-icon"
          onClick={(e) => {
            e.preventDefault();
            setModelview(false);
          }}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div className="btns">
          <button
            className="btn btn-cancel"
            onClick={(e) => {
              e.preventDefault();

              setModelview(false);
            }}
          >
            cancel
          </button>
          <button className="btn btn-add">
            {isLoading ? "submiting..." : "submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

// {/* <div className="assign-box-container">
// <div className="assign-box">
//
// </div>
// <div className="assign-box">
//
// </div>
// <div className="assign-box">
//
// </div>
// <div className="assign-box">
//
// </div>
// <div className="assign-box">

// </div>
// <button className="btn btn-save">save</button>
// </div> */}
