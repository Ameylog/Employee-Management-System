import React, { useState, useEffect } from "react";
import empService from "../service/emp.service";
import { Link } from "react-router-dom";

const Home = () => {
  const [empList, setEmpList] = useState([]);
  const [msg, setMsg] = useState("");

  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");

  const [pageNumber, setpageNumber] = useState(0); 
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    init();
  }, [pageNumber, pageSize]);


  const init = () => {
    empService
      .getAllEmp(pageNumber, pageSize)

      .then((res) => {
        // console.log("API Response:", res.data.content);
        setEmpList(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handlePageChange = (pageNumber) => {
    setpageNumber(pageNumber);
  };

  const deleteEmp = (id) => {
    empService
      .deleteEmp(id)
      .then((res) => {
        setMsg("Delete Successfully");
        setTimeout(() => {
          setMsg("");
        }, 2000);

        init();
      })
      .catch((error) => {
        console.log("Axios error:", error);
      });
  };

  const handleSearch = () => {
    empService
      .getEmpByFirstName(keyword)
      .then((res) => {
        setEmpList(res.data);

        if (res.data.length === 0) {
          setMessage("No records found");

          setTimeout(() => {
            setMessage("");
            setKeyword("");
            init();
          }, 1000);
        } else {
          setMessage("");
        }
      })
      .catch((error) => {
        console.log("Axios error:", error);
      });
  };

  return (
    <div className="container">
      <div className="">
        <h1 className="text-center mt-3">Employee Management System</h1>

        {/* Search box */}
        <div className="d-flex mt-4">
          <input
            className="form-control me-2 w-25 custom-outline"
            type="search"
            placeholder="Search employee"
            aria-label="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />


          {/* Search button */}
          <button
            className="btn btn-outline-primary text-white bgPrime bgprime"
            onClick={handleSearch}
          >
            Search
          </button>
         </div>
        {message && <h4 className="text-center text-success">{message}</h4>}
        {msg && <h4 className="text-center text-success">{msg}</h4>}

      </div>

      <div className="table-responsive">
        <table className="table table-bordered mt-5">
          <thead className="bg-body text-center">
            <tr>
              <th scope="col">SL No</th>
              <th Scope="col">Image</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Salary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">

            {empList.map((e, num) => ( 
              
              <tr key={e.id}>
                
                <th scope="row" className="text-center">{(pageNumber) * pageSize + num + 1}</th>
               
                <td>
                  {e.imageData && (
                    <img
                      src={`data:image/jpeg;base64,${e.imageData}`}
                      alt="Employee"
                      className="employee-image"
                      style={{ width: '75px', height: '75px' }}
                    />
                  )}
                </td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <Link to={"editEmp/" + e.id} className="btn btn-md btn-primary me-2 bgPrime bgprime">
                      Edit
                    </Link>
                    <button onClick={() => deleteEmp(e.id)} className="btn btn-md btn-warning bgwarning">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex jusity-content-right align-item-right mt-4">

        <nav aria-label="Page navigation example">
          <ul className="pagination">

            {/* Previous Button */}
            <li className={`page-item ${pageNumber === 0 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 0}
              > Previous
              </button>
            </li>

            {/* Number of different Pages */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={`page-item ${pageNumber === index ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index)}
                > {index + 1}
                </button>
              </li>
            ))}

            {/* Next Page Button */}
            <li className={`page-item ${pageNumber === totalPages - 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages}
              > Next
              </button>
            </li>

          </ul>
        </nav>

      </div>
    </div>
  );
};

export default Home;


// body :- #e2e2e2!important
// background- navbar: #009688 !important

