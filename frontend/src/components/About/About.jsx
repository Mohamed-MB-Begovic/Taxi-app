/* eslint-disable react/prop-types */
import { useUser } from "../../context/UseUser";
import "./about.css";
export default function About() {
  const { theme } = useUser();
  return (
    <div className={`about ${theme === "dark" ? "dark" : ""}`}>
      <h2>About Us</h2>
      <div className="about-container">
        <img src="./about.png" alt="about img" />
        <div className="about-right">
          <h2>Cab Management System</h2>
          <p>
            Cab Management Software by Rocket Flow provides a centralized
            platform to manage various aspects of a cab or ride-hailing service.
            It typically includes features such as ride booking, driver and
            vehicle management, real-time tracking, payment processing, and
            customer support. The platform is designed to make it easier for cab
            service providers to manage their operations, streamline their ...
            Read More
          </p>
          <button className="btn btn-seemore">read More</button>
        </div>
      </div>
    </div>
  );
}
