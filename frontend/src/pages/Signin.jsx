/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "./css/signin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../context/UseUser";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, login, setUser } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/user/signin", formData);

      toast.success("login successfully");
      // console.log(data);
      setIsLoading(false);
      login(data, data.expiresIn);
      setUser(data);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log("error in signin " + error);
      if (error.message === "Network Error") {
        toast.error("network error");
      } else {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-left">
          <div className="signin-header">
            <div className="logo">
              <ion-icon name="cog-outline"></ion-icon>
              <span>Go</span>tech
            </div>
            <h2>
              Login To <mb>Gotech</mb> Dashbourd
            </h2>
          </div>
          <div className="signin-inputs">
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              onChange={handleChange}
            />
            <button className="btn btn-continue" onClick={handleSubmit}>
              {isLoading ? "loading" : "continue"}
            </button>
            <p>
              I don't have an account please
              <Link to="/signup" className="btn-signup">
                {" "}
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
