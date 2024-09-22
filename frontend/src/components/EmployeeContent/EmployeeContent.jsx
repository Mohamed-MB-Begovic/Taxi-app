/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./employeeContent.css";
import { useEffect, useState } from "react";

import { useUser } from "../../context/UseUser";
import Table from "./Table";
import EmployeeModel from "./EmployeeModel";

export default function EmployeeContent() {
  const [modelView, setModelView] = useState(false);
  const { getEmp, EmpData, setempData,systemTheme } = useUser();
  useEffect(() => {
    getEmp();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = EmpData?.slice(startIndex, lastIndex);
  const npages = Math.ceil(EmpData?.length / recordsPerPage);
  const numbers = [...Array(npages ? npages + 1 : "").keys()].slice(1);

  const handleChange = async (e) => {
    const text = e.target.value;
    // console.log(text);
    const filtererdData = EmpData.filter((emp) => emp.emp_id === Number(text));
    if (filtererdData.length > 0) {
      setempData(filtererdData);
    }
    if (filtererdData.length === 0) {
      getEmp();
    }
    if (!text) {
      getEmp();
    }
  };
  const nexPage = () => {
    if (currentPage !== npages) {
      setCurrentPage(currentPage + 1);
    }
  };
  function changePage(id) {
    setCurrentPage(id);
  }
  function prePage(e) {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  return (
    <div className={`page-content ${systemTheme==="light"?"light":""}`}>
      {EmpData && (
        <>
          <h2 className="title">Employees</h2>
          <div className="search-content">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              placeholder="search emp here"
              onChange={handleChange}
            />
          </div>
          {EmpData.length === 0 ? "" : <Table records={records} />}
        </>
      )}
      <div className="bottom-actions">
        <button
          className="btn btn-add"
          onClick={(e) => {
            e.preventDefault();
            setModelView(!modelView);
          }}
        >
          Add user
        </button>
        {EmpData?.length <= 0 ? (
          ""
        ) : (
          <>
            <div className="pagination">
              <ul className="page-links">
                <button onClick={prePage}>
                  {/* <ion-icon name="chevron-back-outline"></ion-icon> */}
                  Prev
                </button>

                {numbers.map((n, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                  >
                    <a
                      href="#"
                      className="page-item"
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <button onClick={nexPage}>
                {/* <ion-icon name="chevron-forward-outline"></ion-icon> */}
                Next
              </button>
              </ul>
              
            </div>
          </>
        )}
      </div>
      {modelView && <EmployeeModel setModelView={setModelView} />}
    </div>
  );
}
