/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../context/UseUser";
export default function CarModel({ setModelView, carToEdit }) {
  // const [modelView, setModelView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [amount, setAmount] = useState("");
  // const [registeredDate, setRegisteredDate] = useState();
  // const [formData, setFormData] = useState({
  //   type: "",
  //   plateNo: "",
  //   amount: "",
  //   registeredDate: "",
  //   status: "anActive",
  // });
  const isEditing = carToEdit != null;

  // console.log(carToEdit);
  useEffect(() => {
    if (isEditing) {
      setType(carToEdit.type);
      setAmount(carToEdit.amount);
      // setRegisteredDate(carToEdit.registeredDate);s
      setPlateNo(carToEdit.plateNo);
    }
  }, [carToEdit]);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  // };
  const { getCar } = useUser();
  useEffect(() => {
    getCar();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("type", type);
    formdata.append("plateNo", plateNo);
    formdata.append("amount", amount);
    // formdata.append("registeredDate", registeredDate);
    const obj = Object.fromEntries(formdata.entries());
    // console.log(obj);
    try {
      let response;
      if (isEditing) {
        setIsLoading(true);
        // console.log(obj);
        response = await axios.post(
          "/api/car/update-car/" + carToEdit._id,
          obj
        );

        setModelView(false);
        setIsLoading(false);
        toast.success("updated sucessfully");
        getCar();
      } else {
        setIsLoading(true);
        // console.log(obj);
        response = await axios.post("/api/car/register", obj);

        setModelView(false);
        setIsLoading(false);
        toast.success("added sucessfully");
        getCar();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
    }
  };
  return (
    <div className="add-user-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Type">Type</label>
          <input
            type="text"
            id="type" required
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone no">Plate No</label>
          <input
            type="text"
            id="plateNo" required
            value={plateNo}
            onChange={(e) => setPlateNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amoount">Amount</label>
          <input
            type="text"
            id="amount"
            value={amount} required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="Registered Date">Registered Date</label>
          <input
            type="date"
            id="registeredDate"
            value={registeredDate}
            onChange={(e) => setRegisteredDate(e.target.value)}
          />
        </div> */}

        <button
          className="close-icon"
          onClick={(e) => {
            e.preventDefault();

            setModelView(false);
          }}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div className="btns">
          <button
            className="btn btn-cancel"
            onClick={(e) => {
              e.preventDefault();

              setModelView(false);
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
