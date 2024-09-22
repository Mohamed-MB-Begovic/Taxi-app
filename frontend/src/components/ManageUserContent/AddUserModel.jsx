/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../context/UseUser";
import { useNavigate } from "react-router-dom";

export default function AddUserModel({ emp, empToEdit, setModelView }) {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { getUsers } = useUser();
  const [brandname, setBrandame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("Brandname", brandname);
    formdata.append("Email", email);
    formdata.append("Password", password);
    // formdata.append("image", image);
    if (image != null) {
      formdata.append("image", image);
    }
    if (confirmPassword != password) {
      return toast.error("please confirm password");
    }
    // const obj = Object.fromEntries(formdata.entries());
    // console.log(obj);
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/user/add-user", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(data);
      toast.success("inserted successfully");
      setIsLoading(false);
      //   navigate("/signin");
      setModelView(false);
      getUsers();
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      if (error.message === "Network Error") {
        toast.error("network error");
      } else {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <>
      <div className="add-user-container">
        <form className="add-form">
          <div>
            <label htmlFor="fullname">FullName</label>
            <input
              type="text"
              id="Brandname"
              placeholder="Enter username"
              autoComplete="off"
              value={brandname}
              onChange={(e) => setBrandame(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm password">confirm password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button className="btn btn-add" onClick={handleSubmit}>
              {isLoading ? "submiting..." : "submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
