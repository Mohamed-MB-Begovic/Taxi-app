/* eslint-disable react-hooks/exhaustive-deps */
import "./manageuser.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UseUser";
import Table from "./Table";
import AddUserModel from "./AddUserModel";
export default function ManageUser() {
  const [modelView, setModelView] = useState(false);
  const { getUsers, users, setUsers } = useUser();
  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = async (e) => {
    const text = e.target.value;
    const filtererdData = await users.filter((user) =>
      user.Brandname.toLowerCase().includes(text)
    );
    if (filtererdData.length > 0) {
      setUsers(filtererdData);
    }
    if (filtererdData.length === 0) {
      getUsers();
    }
    if (!text) {
      getUsers();
    }
  };

  return (
    <div className="page-content">
      {users && users.length === 0 ? (
        <h2>Yet No Users</h2>
      ) : (
        <>
          <h2>users</h2>
          <div className="search-content">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="search user here"
              onChange={handleChange}
            />
          </div>
          {users?.length === 0 ? "" : <Table />}
        </>
      )}
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          setModelView(!modelView);
        }}
      >
        add user
      </button>
      {modelView && <AddUserModel setModelView={setModelView} />}
    </div>
  );
}
