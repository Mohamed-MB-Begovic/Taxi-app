/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./css/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  // const [brandName, setBrandName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Brandname: "",
    email: "",
    Password: "",
  });
  const updateData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword != formData.Password) {
      return toast.error("please confirm password");
    }
    try {
      setIsLoading(true);
      console.log('hellow')
      const { data } = await axios.post("/api/user/signup", formData);
      toast.success("inserted successfully");
      setIsLoading(false);
      navigate("/signin");
      console.log(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.message === "Network Error") {
        toast.error("network error");
      } else {
        toast.error(error.response.data);
      }
    }
  };
  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-header">
            <div className="logo">
              <ion-icon name="cog-outline"></ion-icon>
              <span>Go</span>tech
            </div>
            <h2>
              Sign up To <mb>Gotech</mb> Signin
            </h2>
          </div>
          <div className="signup-inputs">
            <input
              type="text"
              id="Brandname"
              placeholder="Enter username"
              autoComplete="off"
              onChange={updateData}
            />
            <input
              type="text"
              id="email"
              placeholder="Email"
              autoComplete="off"
              onChange={updateData}
            />
            <input
              type="password"
              id="Password"
              placeholder="Enter Password"
              onChange={updateData}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn btn-continue" onClick={handleSubmit}>
              {isLoading ? "Loading..." : "Continue"}
            </button>
            <p>
              I have already an account please
              <Link to="/signin" className="btn-signup">
                {" "}
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
