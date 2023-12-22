import React, { useState, useRef } from "react";
import empService from "../service/emp.service";

const AddEmp = () => {

  // emp object
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

  // handler fuction for emp
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  // handler fuction for file
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // submit button
  const submitEmp = (e) => {
    e.preventDefault();

    // formData 
    const formData = new FormData();
    formData.append("emp", JSON.stringify(emp));
    formData.append("file", selectedFile);

    // empservice for save
    empService
      .saveEmp(formData)
      .then((res) => {
        setMsg("Employee Added Successfully");
      //  console.log("Employee Data:", emp, selectedFile);
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
    <div className="container pt-4 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card border border-warning">
            <div className="card-header text-center fs-3 bg-warning ">
              Add Employee
              {msg && <h4 className="text-success">{msg}</h4>}
            </div>

            <div className="card-body">
              <form onSubmit={(e) => submitEmp(e)}>

                {/* first name */}
                <div className="mb-3 ">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control custom-out" required
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
                    className="form-control custom-out" required
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
                    className="form-control custom-out" required
                    name="email"
                    value={emp.email}
                    onChange={(e) => handleChange(e)}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                    title="Enter a valid email address"
                  />
                </div>

                {/* address */}
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control custom-out" required
                    name="address"
                    value={emp.address}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* salary */}
                <div className="mb-3">
                  <label>Salary</label>
                  <input
                    type="number"
                    className="form-control custom-out" required
                    name="salary"
                    value={emp.salary}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* Image  */}
                <div >
                  <label>Image</label><br />
                  <input
                    type="file"
                    className="form-control custom-out"
                    name="imageData"
                    accept="image/jpeg, image/png, image/jpg, image/jfif"
                    onChange={handleFileChange}
                    ref={fileInputRef} // Add the ref here
                  />
                </div>
                <br />

                {/* submit button */}
                <div className="text-center">
                  <button className="btn text-white bgPrime bgprime">Submit</button>
                  <input
                    type="Reset"
                    className="btn bg-warning ms-2 bgwarning"
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


