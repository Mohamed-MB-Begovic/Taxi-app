/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./assigncar.css";
import AssignCarModel from "./AssignCarModel";
import { useUser } from "../../context/UseUser";
import Table from "./Table";

export default function AssignCarContent() {
  const [modelview, setModelview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAssignedCars, AssignedCars, EmpData, getEmp,systemTheme } = useUser();
  // console.log(AssignedCars);

  // console.log(EmpData);
  useEffect(() => {
    setIsLoading(true);
    getAssignedCars();
    getEmp();
    setIsLoading(false);
  }, []);
  return (
    <div className={`page-content ${systemTheme==="light" ?"light":""}`}>
      {isLoading && <h2>loading...</h2>}
      {AssignedCars && (
        <>
          {AssignedCars.length === 0 ? (
            ""
          ) : (
            <>
              <h2 className="title">List of Assigned cars</h2>
              <Table />
            </>
          )}
        </>
      )}
      <button
        className="btn btn-add"
        onClick={(e) => {
          e.preventDefault();
          setModelview(!modelview);
        }}
      >
        assign
      </button>
      {modelview && <AssignCarModel setModelview={setModelview} />}
    </div>
  );
}
