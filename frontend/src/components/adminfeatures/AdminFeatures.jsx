import { useUser } from "../../context/UseUser";
import "./adminfeatures.css";
import { Link } from "react-router-dom";
export default function AdminFeatures() {
  const { user } = useUser();
  return (
    <div className="admin-features">
      <h2>Taxi Mangment Admin Panel Features</h2>
      <div className="boxes">
        <div className="box">
          <img src="./f-1.png" alt="" />
          <div className="right">
            <h3>Dashbourd For End To End Control</h3>
            <p>
              The central admin portal provides a comprehensive view of the
              entire fleet, including real-time location, availability, and
              status of each vehicle. It allows fleet managers to efficiently
              monitor and manage the fleet, assign vehicles to drivers, and
              optimize resource allocation.
            </p>

            <Link
              to={user ? "/dashbourd" : "/signin"}
              className="btn btn-getstarted"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="right">
            <h3>Assign And Update Drivers</h3>
            <p>
              Taxi Management System provides effective management of drivers,
              including driver profiles, documentation, licensing, and
              scheduling. It provides a centralized platform for monitoring
              driver performance, tracking driver availability, and assigning
              tasks, leading to improved driver efficiency and productivity.
            </p>
            <Link
              to={user ? "/dashbourd" : "/signin"}
              className="btn btn-getstarted"
            >
              Get Started
            </Link>
          </div>
          <img src="./f-2.png" alt="" />
        </div>
        <div className="box">
          <img src="./f-1.png" alt="" />
          <div className="right">
            <h3>Every insight about Bookings</h3>
            <p>
              Taxi Management System provides a detailed view of each booking
              with essential information such as customer contact details,
              emergency contact details, Fleet preference, Driver assigned, Task
              Timeline, Tracking, Kanban view and much more.
            </p>
            <Link
              to={user ? "/dashbourd" : "/signin"}
              className="btn btn-getstarted"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
