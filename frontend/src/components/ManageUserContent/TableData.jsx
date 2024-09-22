/* eslint-disable no-unused-vars */
import { useState } from "react";
import UserModel from "./UserModel";
import { useUser } from "../../context/UseUser";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function TableData({ user }) {
  const [modelView, setModelView] = useState();
  const { users, setUsers, getUsers } = useUser();

  const handleDelete = async (id) => {
    if (!confirm("are your sure to delete ")) return;
    const previousUsers = [...users];
    const updatedUsers = users.filter((user) => user._id != id);
    setUsers(updatedUsers);
    // getEmp();
    getUsers();
    try {
      const { data } = await axios.delete("/api/user/delete-user/" + id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>
        <img
          src={user?.image ? user.image : "/profile.jpeg"}
          alt={user.user_id}
        />
      </td>
      <td>{user.Brandname}</td>
      <td>{user.Email}</td>
      <td>{user.role}</td>
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
            <UserModel
              userToEdit={user}
              userName={user.Brandname}
              setModelView={setModelView}
            />
          </>
        ) : (
          ""
        )}
        <button
          className="link delete-link"
          onClick={() => handleDelete(user._id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
