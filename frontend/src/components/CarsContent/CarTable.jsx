/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useUser } from "../../context/UseUser";
import CarData from "./CarData";

export default function CarTable({ records }) {
  const { carResult } = useUser();
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Plate No</th>
            <th>Registered Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((car) => {
              return <CarData car={car} carToEdit={car} key={car._id} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
