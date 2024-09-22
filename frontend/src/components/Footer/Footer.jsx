import { useUser } from "../../context/UseUser";
import "./footer.css";
export default function Footer() {
  const { theme } = useUser();
  return (
    <div className={`footer ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="left-footer">
        <h2>contact us</h2>
        <div>
          <ion-icon name="mail-outline"></ion-icon>
          mohamed12@gmail.com
        </div>
        <div>
          <ion-icon name="call-outline"></ion-icon>
          +252 613149900
        </div>
        <div>
          <ion-icon name="location-outline"></ion-icon>
          somalia-kismayo-guulwade-212,wadada-mareexaanka
        </div>
      </div>
      <div className="right-footer">
        <ul className="footer-links">
          Services
          <li>Fleet Managment</li>
          <li>Driver Payout</li>
          <li>Customer Website</li>
          <li>mobile riding</li>
        </ul>
        <ul className="footer-links">
          information
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Features</li>
          <li>Admin</li>
        </ul>
        <ul className="footer-links">
          industries we serve
          <li>Logistics</li>
          <li>Automotive</li>
          <li>Manufacturing</li>
          <li>Real State</li>
        </ul>
        <ul className="footer-links">
          Helping Links
          <li>Services</li>
          <li>Support</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </div>
  );
}
