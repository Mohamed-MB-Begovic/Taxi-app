import { useUser } from "../../context/UseUser";
import "./topusers.css";
export default function Topusers() {
  const { theme } = useUser();
  return (
    <div className="features">
      <h2>Already Trusted By 4000+ Forward Thinking Companies</h2>
      <div className={`feature-imgs ${theme === "dark" ? "dark-version" : ""}`}>
        <img src="./feature-1.png" alt="" />
        <img src="./feature-2.png" alt="" />
        <img src="./feature-4.png" alt="" />
        <img src="./feature-5.png" alt="" />
        <img src="./feature-3.png" alt="" />
      </div>
      <button className="btn btn-joinus">Join Us</button>
    </div>
  );
}
