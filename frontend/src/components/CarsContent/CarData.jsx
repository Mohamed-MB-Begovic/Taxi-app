/* eslint-disable no-unused-vars */
import { useState } from "react";
import CarModel from "./CarModel";
import { useUser } from "../../context/UseUser";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function CarData({ car }) {
  const [modelView, setModelView] = useState(false);

  const { carResult, setCarData } = useUser();

  const handleDelete = async (car_id) => {
    if (!confirm("are your sure to delete ")) return;
    const previousCar = [...carResult];
    const updatedCars = carResult.filter((car) => car._id != car_id);
    setCarData(updatedCars);
    // getEmp();
    try {
      const { data } = await axios.delete("/api/car/delete-car/" + car_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>{car.car_id}</td>
      <td>{car.type}</td>
      <td>{car.plateNo}</td>
      <td>{car.registeredDate}</td>
      <td>{car.amount}</td>
      <td>{car.status}</td>
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
            <CarModel carToEdit={car} setModelView={setModelView} />
          </>
        ) : (
          ""
        )}
        <button
          className="link delete-link"
          onClick={() => handleDelete(car._id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
