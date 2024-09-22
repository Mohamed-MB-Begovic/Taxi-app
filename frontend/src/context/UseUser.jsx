/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [EmpData, setempData] = useState(null);
  const [carResult, setCarData] = useState(null);
  const [AssignedCars, setAssignedCars] = useState(null);
  const [theme, setTheme] = useState("light");
  const [systemTheme, setSystemTheme] = useState("dark");
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [admins, setAdmins] = useState();

  const getUsers = async () => {
    try {
      const { data } = await axios.get("api/user/get-users");
      {
        data && setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAdmins = async () => {
    try {
      const { data } = await axios.get("api/user/get-admins");
      {
        data && setAdmins(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEmp = async () => {
    try {
      const { data } = await axios.get("api/employee/get-emp");
      {
        data && setempData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  const getAssignedCars = async () => {
    try {
      const { data } = await axios.get("api/assign-car/get-cars");
      {
        // console.log("data", data);

        data && setAssignedCars(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCar = async () => {
    try {
      // console.log("get car");
      const { data } = await axios.get("api/car/get-cars");

      {
        data && setCarData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    setUser(null);
  };

  const login = (userData, expiresIn) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem("expirationTime", expirationTime.toString());
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const updateprofile = (userdata) => {
    localStorage.setItem("user", JSON.stringify(userdata));

    setUser(userdata);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedUser && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(expirationTime)) {
        setUser(JSON.parse(storedUser));
      } else {
        Logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        Logout,
        getEmp,
        getCar,
        EmpData,
        carResult,
        setCarData,
        setempData,
        getAssignedCars,
        AssignedCars,
        setAssignedCars,
        users,
        getUsers,
        admins,
        setAdmins,
        setUsers,
        getAdmins,
        updateprofile,
        theme,
        setTheme,
        systemTheme, setSystemTheme
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
