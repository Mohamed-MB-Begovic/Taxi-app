/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../context/UseUser";

export default function EmployeeModel({ emp, empToEdit, setModelView }) {
  // const [modelView, setModelView] = useState(false);
  const { getEmp } = useUser();
  const [image, setImage] = useState(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = empToEdit != null;
  useEffect(() => {
    if (isEditing) {
      setName(empToEdit.fullname);
      setEmail(empToEdit.email);
      setPhone(empToEdit.phoneNo);
    }
  }, [emp]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      setImage(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", name);
    formdata.append("email", email);
    formdata.append("phoneNo", phone);
    formdata.append("image", image);

    try {
      if (isEditing) {
        setIsLoading(true);
        const response = await axios.post(
          "/api/employee/update-emp/" + empToEdit._id,
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setModelView(false);
        setIsLoading(false);
        toast.success("updated sucessfully");
        getEmp();
      } else {
        setIsLoading(true);
        // console.log(formdata);
        const response = await axios.post("/api/employee/register", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setModelView(false);
        setIsLoading(false);
        toast.success("added sucessfully");
        getEmp();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
    }
  };
  return (
    <>
      <div className="add-user-container">
        <form className="add-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname">FullName</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone no">Phone No</label>
            <input
              type="number"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input type="file" onChange={handleImageChange} />
          </div>

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
    </>
  );
}
