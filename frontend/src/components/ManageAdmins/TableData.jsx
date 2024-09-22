/* eslint-disable no-unused-vars */
import { useState } from "react";
import UserModel from "./UserModel";
import axios from "axios";
import { useUser } from "../../context/UseUser";

/* eslint-disable react/prop-types */
export default function TableData({ admin }) {
  const [modelView, setModelView] = useState();
  const { admins, setAdmins, getAdmins } = useUser();

  const handleDelete = async (id) => {
    if (!confirm("are your sure to delete ")) return;
    const previousAdmins = [...admins];
    const updatedAdmins = admins.filter((admin) => admin._id != id);
    setAdmins(updatedAdmins);
    getAdmins();
    try {
      const { data } = await axios.delete("/api/user/delete-admin/" + id);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td>
        <img
          src={admin.image ? admin.image : "/profile.jpeg"}
          alt={admin.admin_id}
        />
      </td>
      <td>{admin.Brandname}</td>
      <td>{admin.Email}</td>
      <td>{admin.role}</td>
      <td>
        {/* <a
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
            <UserModel
              userToEdit={admin}
              userName={admin.Brandname}
              setModelView={setModelView}
            />
          </>
        ) : (
          ""
        )} */}
        <button
          className="link delete-link"
          onClick={() => handleDelete(admin._id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
