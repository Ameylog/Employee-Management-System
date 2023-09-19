import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empService from "../service/emp.service";

const EditEmp = () => {
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [emp, setEmp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    salary: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFileName, setCurrentFileName] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    empService
      .getEmpById(id)
      .then((res) => {
        setEmp(res.data);
        setCurrentFileName(res.data.imageName || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setCurrentFileName(file.name); // Display the selected file name
  };

  const updateEmp = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("emp", JSON.stringify(emp));
    formData.append("file", selectedFile);

    empService
      .updateEmp(id, formData)
      .then((res) => {
        setMsg("Employee Data updated");
        setTimeout(() => {
          setMsg("");
        }, 2000);

        navigate("/");
      })
      .catch((error) => {
        console.log("Axios error:", error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header text-center fs-3">
                Edit Employee
                {msg && <p className="text-success">{msg}</p>}
              </div>

              <div className="card-body">
                <form onSubmit={(e) => updateEmp(e)}>
                  <div className="mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="firstName"
                      value={emp.firstName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      name="lastName"
                      value={emp.lastName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Email </label>
                    <input
                      type="text"
                      className="form-control"
                      required
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
                      className="form-control"
                      required
                      name="address"
                      value={emp.address}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      name="salary"
                      value={emp.salary}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                      <label className="input-group-text btn btn-primary">
                        Choose File
                        <input
                          type="file"
                          className="form-control"
                          style={{ display: "none" }}
                          name="imageData"
                          accept="image/png, image/jpeg"
                          onChange={(e) => handleFileChange(e)}
                          onClick={() => fileInputRef.current.click()}
                          ref={fileInputRef}
                        />
                      </label>
                      {currentFileName && (
                        <div className="form-control">
                          <p className="mb-0">{currentFileName}</p>
                        </div>
                      )}
                    </div>
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
    </div>
  );
};

export default EditEmp;
