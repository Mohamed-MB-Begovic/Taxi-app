/* eslint-disable react/prop-types */
import { useUser } from "../../context/UseUser";
import "./newsletter.css";
export default function Newsletter() {
  const { theme } = useUser();
  return (
    <div className={`newsletter ${theme === "dark" ? "dark-mode" : ""}`}>
      <input type="text" placeholder="subscribe to news letter..." />
      <button className="btn-subscribe">subscribe</button>
    </div>
  );
}
