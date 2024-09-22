/* eslint-disable react/prop-types */
import { useUser } from "../../context/UseUser";
import "./hero.css";
export default function Hero() {
  const { theme } = useUser();
  return (
    <div className={`hero ${theme === "dark" ? "dark" : ""}`}>
      <div className="left-hero">
        <h2>
          we create simple solutions <span>for your complex task</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
          eligendi aut repellat!
        </p>
        <div className="hero-btns">
          <button className="btn btn-ourwork">our works</button>
          <button className="btn btn-knowmore">know more</button>
        </div>
      </div>
      <div className="right-hero">
        <img src="f-2.png" alt="hero image" />
      </div>
    </div>
  );
}
