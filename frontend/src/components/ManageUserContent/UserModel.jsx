/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../context/UseUser";
export default function UserModel({ userToEdit, setModelView, userName }) {
  //   console.log(userToEdit);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const { getUsers } = useUser();
  //   const [userName, setUserName] = useState();

  const chooseOption = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === "") {
      return toast.error("please choose role");
    }

    if (value === userToEdit.role) {
      return toast.error("he is already a" + value);
    }

    try {
      const request = await axios.post(
        "/api/user/update-role/" + userToEdit._id,
        { value }
      );
      getUsers();
      setModelView(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-user-container admin-model">
      <form className="role-update-form">
        <div>
          <label htmlFor="fullname">{userName}</label>
          <select name="" id="" onChange={chooseOption}>
            <option value="">choose role</option>
            <option value="user">user</option>
            <option value="admin">Admin</option>
          </select>
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
        <button className="btn btn-save" onClick={handleSubmit}>
          {isLoading ? "updating..." : "update"}
        </button>
      </form>
    </div>
  );
}
