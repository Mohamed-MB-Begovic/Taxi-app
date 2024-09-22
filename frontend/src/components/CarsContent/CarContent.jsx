/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./carcontent.css";
import { useUser } from "../../context/UseUser";
import CarTable from "./CarTable";
import CarModel from "./CarModel";

export default function CarContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [modelView, setModelView] = useState(false);
  const { getCar, carResult,systemTheme } = useUser();

  useEffect(() => {
    setIsLoading(true);
    getCar();
    setIsLoading(false);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = carResult?.slice(startIndex, lastIndex);
  const npages = Math.ceil(carResult?.length / recordsPerPage);
  const numbers = [...Array(npages ? npages + 1 : "").keys()].slice(1);
  // const handleChange = async (e) => {
  //   const text = e.target.value;
  //   // console.log(text);
  //   const filtererdData = EmpData.filter((emp) => emp.emp_id === Number(text));
  //   if (filtererdData.length > 0) {
  //     setempData(filtererdData);
  //   }
  //   if (filtererdData.length === 0) {
  //     getEmp();
  //   }
  //   if (!text) {
  //     getEmp();
  //   }
  // };
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
      {isLoading && <h2>loading...</h2>}
      {carResult && (
        <>
          <h2>Car List</h2>
          {carResult.length === 0 ? "" : <CarTable records={records} />}
        </>
      )}

      {/* <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          setModelView(true);
        }}
      >
        add
      </button> */}
      <div className="bottom-actions">
        <button
          className="btn btn-add"
          onClick={(e) => {
            e.preventDefault();
            setModelView(true);
          }}
        >
          Add
        </button>
        {carResult?.length <= 0 ? (
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
      {modelView && <CarModel setModelView={setModelView} />}
    </div>
  );
}
