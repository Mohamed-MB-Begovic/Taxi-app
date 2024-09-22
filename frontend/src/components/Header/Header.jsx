import { useUser } from "../../context/UseUser";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { Logout,systemTheme, setSystemTheme } = useUser();

  return (
    <div className={`header ${systemTheme==="light"? "light ":""}`}>
      <ul className="header-list">
        {/* <div className="user">
          <img src="p-1.png" />
          <p>Welcome {user ? user.Brandname : ""}</p>
        </div> */}
        <li>
        <ion-icon
            name="sunny-outline"
            onClick={() => {
              if (systemTheme === "dark") {
                setSystemTheme("light");
              } else {
                setSystemTheme("dark");
              }
            }}
          ></ion-icon>
        </li>
        <li>
          <Link to="/edit-profile">
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <ion-icon
            name="log-out-outline"
            onClick={() => {
              Logout();
              navigate("/");
            }}
          ></ion-icon>
        </li>
      </ul>
    </div>
  );
}
