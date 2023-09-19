
import React, { useState, useRef } from "react";
import empService from "../service/emp.service";
import { Navigate, useNavigate } from "react-router-dom";

const AddEmp = () => {

  const navigate = useNavigate();
  const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    salary: "",
  });
  // image Object
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // Ref for the file input element

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitEmp = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("emp", JSON.stringify(emp));
    formData.append("file", selectedFile);

    empService
      .saveEmp(formData)
      .then((res) => {
        setMsg("Employee Added Successfully");
        // console.log("Employee Data:", emp, selectedFile);
        setTimeout(() => {
          setMsg("");
        }, 2000);

        setEmp({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          salary: "",
        });
        setSelectedFile(null);

        // Reset the file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center fs-3">
              Add Employee
              {msg && <p className="text-success">{msg}</p>}
            </div>

            <div className="card-body">
              <form onSubmit={(e) => submitEmp(e)}>
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control" required
                    name="firstName"
                    value={emp.firstName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control" required
                    name="lastName"
                    value={emp.lastName}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label>Email </label>
                  <input
                    type="text"
                    className="form-control" required
                    name="email"
                    value={emp.email}
                    onChange={(e) => handleChange(e)}
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    title="Enter a valid email address"
                  />
                </div>

                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control" required
                    name="address"
                    value={emp.address}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label>Salary</label>
                  <input
                    type="number"
                    className="form-control" required
                    name="salary"
                    value={emp.salary}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Image</label><br />
                  <input
                    type="file"
                    className="form-control"
                    name="imageData"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    ref={fileInputRef} // Add the ref here
                  />
                </div>

                <br />
                <div className="text-center">
                  <button className="btn btn-success">Submit</button>
                  <input
                    type="Reset"
                    className="btn btn-danger ms-2"
                    value="Reset"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmp;


