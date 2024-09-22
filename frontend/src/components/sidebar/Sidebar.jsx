/* eslint-disable react/no-unescaped-entities */
import "./sidebar.css";
import { useUser } from "../../context/UseUser";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { user,systemTheme } = useUser();
  // console.log(user);
  return (
    <div className={`sidebar ${systemTheme==="light" ?"light":"" }`}>
      <div className="topSidebar">
        <img src={user?.image ? user.image : "profile.jpeg"} />
        <p> {user ? user.Brandname : ""}</p>
      </div>
      {user && user.role === "admin" ? (
        <>
          <ul className="sidebarList">
            <NavLink to="/admin-dashbourd" className="sidebarItem">
              <ion-icon name="home-outline"></ion-icon>
              <p>Home</p>
            </NavLink>
            <NavLink to="/manage-users" className="sidebarItem">
              <ion-icon name="person-outline"></ion-icon>
              <p>Users</p>
            </NavLink>
            <NavLink to="/manage-admins" className="sidebarItem">
            <ion-icon name="person-circle-outline"></ion-icon>
              <p>Admins</p>
            </NavLink>
            <NavLink to="/manage-admins" className="sidebarItem">
            <ion-icon name="expand-outline"></ion-icon>
              <p>Requests</p>
            </NavLink>
          </ul>
        </>
      ) : (
        <ul className="sidebarList">
          <NavLink to="/dashbourd" className="sidebarItem">
            <ion-icon name="home-outline"></ion-icon>
            <p>Home</p>
          </NavLink>
          <NavLink to="/employee" className="sidebarItem">
            <ion-icon name="person-outline"></ion-icon>
            <p>Employee</p>
          </NavLink>
          <NavLink to="/cars" className="sidebarItem">
            <ion-icon name="car-outline"></ion-icon>
            <p>Cars</p>
          </NavLink>
          <NavLink to="/assigncar" className="sidebarItem">
            <ion-icon name="calendar-clear-outline"></ion-icon>
            <p>Asign Car</p>
          </NavLink>
          <NavLink to="/attendence" className="sidebarItem">
          <ion-icon name="checkbox-outline"></ion-icon>
            <p>Attendence</p>
          </NavLink>
          <NavLink to="/view-attendance" className="sidebarItem">
          <ion-icon name="journal-outline"></ion-icon>
            <p>View Attend's</p>
          </NavLink>
          {/* <NavLink to="/payments" className="sidebarItem">
            <ion-icon name="wallet-outline"></ion-icon>
            <p>Payments</p>
          </NavLink> */}
        </ul>
      )}
    </div>
  );
}
