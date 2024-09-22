/* eslint-disable react/prop-types */
import "./navbar.css";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/UseUser";
export default function Navbar() {
  const [State, setState] = useState("home");
  const [fix, setfix] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const { user, Logout, setTheme, theme } = useUser();
  function setFixed() {
    if (window.scrollY >= 600) {
      setfix(true);
    } else {
      setfix(false);
    }
  }
  window.addEventListener("scroll", setFixed);
  console.log(theme);
  return (
    <>
      <div
        className={
          `navbar ${fix ? "fixed" : ""} ${theme === "dark" ? "dark" : ""}`
          // fix ? "navbar  fixed" : "navbar" && theme === "dark" ? "dark" : ""
        }
      >
        <div className="logo">
          <ion-icon name="cog-outline"></ion-icon>
          <span>Go</span>tech
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link
              to="hero"
              syp={true}
              smooth={true}
              offset={-150}
              duration={500}
              href="#"
              onClick={() => {
                setState("home");
                // ScrolltoSection(home);
              }}
              className={`nav-link ${State === "home" ? " active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="about"
              syp={true}
              smooth={true}
              offset={-100}
              duration={500}
              href="#"
              onClick={() => {
                setState("about");
                // ScrolltoSection(ourWork);
              }}
              className={`nav-link ${State === "about" ? " active" : ""}`}
            >
              about
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="services"
              syp={true}
              smooth={true}
              offset={-100}
              duration={500}
              href="#"
              onClick={() => {
                setState("services");
                // ScrolltoSection(services);
              }}
              className={`nav-link ${State === "services" ? " active" : ""}`}
            >
              services
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="newsletter"
              syp={true}
              smooth={true}
              offset={-150}
              duration={500}
              href="#"
              onClick={() => setState("feedback")}
              className={`nav-link ${State === "feedback" ? " active" : ""}`}
            >
              feedback
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="contact"
              syp={true}
              smooth={true}
              offset={-150}
              duration={500}
              href="#"
              onClick={() => setState("contact")}
              className={`nav-link ${State === "contact" ? " active" : ""}`}
            >
              contact
            </Link>
          </li>
        </ul>
        <div className="nav-right">
          <ion-icon
            name="sunny-outline"
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          ></ion-icon>
          {user ? (
            <>
              <NavLink onClick={() => Logout()} className="btn-logout">
                <ion-icon name="log-out-outline"></ion-icon>
              </NavLink>
            </>
          ) : (
            ""
          )}

          {user ? (
            <>
              <img
                src={user.image ? user.image : "profile.jpeg"}
                onClick={() => setUserCheck(!userCheck)}
              />

              {userCheck ? (
                <>
                  <div className="user-box">
                    <ul className="user-items">
                      <NavLink
                        to={
                          user?.role === "admin"
                            ? "/admin-dashbourd"
                            : "/dashbourd"
                        }
                        className="user-item btn-dashbourd"
                      >
                        <ion-icon name="grid-outline"></ion-icon>
                        dashbourd
                      </NavLink>
                      {/* <NavLink
                        to="/dashbourd"
                        className="user-item btn-dashbourd"
                      >
                        <ion-icon name="grid-outline"></ion-icon>
                        dashbourd
                      </NavLink> */}
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <NavLink className="  btn-signin" to="/signin">
                signin
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}
