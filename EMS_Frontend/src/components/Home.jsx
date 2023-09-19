
import React, { useState, useEffect } from "react";
import empService from "../service/emp.service";
import { Link } from "react-router-dom";

const Home = () => {
  const [empList, setEmpList] = useState([]);
  const [msg, setMsg] = useState("");
  const [keyword, setKeyword] = useState(""); // State to store the search term
  const [message, setMessage] = useState("");

  // Load all data on Home Page
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    empService
      .getAllEmp()
      .then((res) => {
        setEmpList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////// Delete Record  ////////////

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

  //////////// Function to handle search ////////

  const handleSearch = () => {
    empService
      .getEmpByFirstName(keyword) // Replace with your API endpoint for searching employees
      .then((res) => {
        setEmpList(res.data);

        if (res.data.length === 0) {     ///// for Record not found   
          setMessage("No records found");
          setTimeout(() => {
            setMessage("");
            setKeyword("")     // empty search fild after search not found
            init();           // Reload all record in home
          }, 1000);
          
        } else {                       /// Show Result
          setMessage("");     // Clear the message if there are search results
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
        {msg && <p className="text-center text-success">{msg}</p>}

       { /* Search Box and Button */}

        <div className="d-flex mt-5">
          <input
            className="form-control me-2 w-25"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="btn btn-outline-primary text-white bg-primary"
            onClick={handleSearch}
          >
            Search
          </button>
         </div>
        {message && <p className="text-center text-success">{message}</p>}    
      </div>

        {/* Table   */}

      <div className="table-responsive">
        <table className="table mt-5">
          <thead className="bg-light">
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
          <tbody>
            {empList.map((e, num) => (
              <tr key={e.id}>
                <th scope="row">{num + 1}</th>
                <td>
                  {e.imageData && (
                    <img
                      src={`data:image/jpeg;base64,${e.imageData}`}
                      alt="Employee"
                      className="employee-image"
                      style={{ width: '70px', height: '70px' }}
                    />
                  )}
                </td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <div className="d-flex justify-content-start">
                    <Link to={"editEmp/" + e.id} className="btn btn-sm btn-primary me-2  "> Edit </Link>
                    <button onClick={() => deleteEmp(e.id)} className="btn btn-sm btn-danger ">Delete </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
