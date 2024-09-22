/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import "./editprofile.css";
import { useUser } from "../../context/UseUser";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
export default function Editprofile() {
  const { user, setUser, updateprofile,systemTheme } = useUser();
  const [brandname, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [updateImage, setUpdatedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBrandName(user?.Brandname);
    setEmail(user?.Email);
    setImage(user?.image ? user.image : "profile.jpeg");
  }, [user]);

  const handlePassChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("please confirm password");
    }
    if (password && confirmPassword === "") {
      toast.error("please confirm password");
    }
    if (password === "") {
      toast.error("please enter password");
    }

    if (password === user?.Password) {
      toast.error("this password already been used");
    }
    try {
      const { data } = await axios.post(
        "api/user/update-profile-password/" + user._id,
        {
          password,
        }
      );
      toast.success("user updated");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("error in update password" + error);
    }
  };

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUpdatedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    if (brandname != user.Brandname) {
      formdata.append("Brandname", brandname);
    }
    if (email != user.Email) {
      formdata.append("Email", email);
    }
    if (updateImage) {
      formdata.append("image", updateImage);
    }
    const obj = Object.fromEntries(formdata.entries());
    // console.log(obj);
    if (Object.keys(obj).length > 0) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "/api/user/update-profile/" + user._id,
          formdata,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setIsLoading(false);
        updateprofile(data);
        toast.success("user updated sucessfully");
        setUser(data);
        // console.log(data);
      } catch (error) {
        console.log("errror in update profile" + error);
      }
    } else {
      toast.error("please input value to updata");
    }
  };

  return (
    <div className={`page-content ${systemTheme==="light"?"light":""}`}>
      <h2>Edit Profile</h2>
      <form className="edit-form">
        <div className="profile-inputs">
          <div className="inputs">
            <div className="input">
              <label htmlFor="">BrandName</label>
              <input
                type="text"
                value={brandname}
                placeholder="username"
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="btn btn-add" onClick={handleSubmit}>
              {isLoading ? "updating" : "update"}
            </button>
          </div>

          <div className="profile-input">
            <img src={preview ? preview : image} alt="" />
            <input type="file" onChange={handleImageChange} />
          </div>
        </div>

        <div className="password-inputs">
          <h2>Password Change</h2>
          <div className="inputs">
            <div className="input">
              <label htmlFor="">New Password</label>
              <input
                type="text"
                placeholder="new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Confirm Password</label>
              <input
                type="text"
                value={confirmPassword}
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-add" onClick={handlePassChange}>
              {isLoading ? "updating" : "update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
