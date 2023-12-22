import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import empService from "../service/emp.service";

const EditEmp = () => {
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // emp object
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



  // useeffect calling 
  useEffect(() => {
    empService
      .getEmpById(id)
      .then((res) => {
        setEmp(res.data);
        // console.log(res.data)
        setCurrentFileName(res.data.imageName || "");


      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // handler fuction for emp
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  // handler fuction for file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setCurrentFileName(file.name); // Display the selected file name
  };

  // Update Function
  const updateEmp = (e) => {
    e.preventDefault();

    // formData 
    const formData = new FormData();
    formData.append("emp", JSON.stringify(emp));
    formData.append("file", selectedFile );

    // empservice for update 
    empService
      .updateEmp(id, formData)
      .then((res) => {
        setMsg("Employee Data updated");

        // console.log("Employee Data:", emp, selectedFile);
        // console.log("FormData:- ",formData)

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
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card border border-warning">
              <div className="card-header text-center fs-3 bg-warning">
                Edit Employee
                {msg && <h4 className="text-success">{msg}</h4>}
              </div>

              <div className="card-body">
                <form onSubmit={(e) => updateEmp(e)}>

                  {/* first name */}
                  <div className="mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control custom-out"
                      required
                      name="firstName"
                      value={emp.firstName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                {/* last name */}
                  <div className="mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control custom-out"
                      required
                      name="lastName"
                      value={emp.lastName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                {/* email */}
                  <div className="mb-3">
                    <label>Email </label>
                    <input
                      type="text"
                      className="form-control custom-out"
                      required
                      name="email"
                      value={emp.email}
                      onChange={(e) => handleChange(e)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"

                    />
                  </div>

                {/* address */}
                  <div className="mb-3">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control custom-out"
                      required
                      name="address"
                      value={emp.address}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  {/* salary */}  {/* salary */}
                  <div className="mb-3">
                    <label>Salary</label>
                    <input
                      type="number"
                      className="form-control custom-out"
                      required
                      name="salary"
                      value={emp.salary}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  {/* Image  */}
                  <div className="mb-3">
                    <label>Image</label>

                    <div className="input-group custom-out">
                      <label className="input-group-text btn btn-light border border-secondary custom-out">
                        Choose File
                        <input
                          type="file"
                          className="form-control custom-out"
                          style={{ display: "none" }}
                          name="imageData"
                          accept="image/jpeg, image/png, image/jpg, image/jfif"
                          onChange={(e) => handleFileChange(e)}
                          onClick={() => fileInputRef.current.click()}
                          ref={fileInputRef}
                        />
                      </label>

                      {currentFileName && (
                        <div className="form-control custom-out">
                          <p className="mb-0">{currentFileName}</p>
                        </div>
                      )}

                    </div>
                  </div>
                  <br />

                  {/* submit button */}
                  <div className="text-center">
                    <button className="btn btn-primary bgPrime bgprime">Submit</button>
                    <input
                      type="Reset"
                      className="btn btn-warning ms-3 bgwarning"
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

