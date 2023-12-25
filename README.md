
# Employee Management System (EMS)

## Overview
The Employee Management System (EMS) is a comprehensive web application built to manage employee records efficiently. This project utilizes a stack of modern technologies, including React.js for the frontend, Spring Boot for the backend, and MySQL for the database. The project aims to provide a user-friendly interface for performing CRUD operations, image upload, employee search functionality, and pagination.

## Features
* CRUD Operations:- The system allows users to Create, Read, Update, and Delete employee records through a user-friendly interface.

* Image Upload:- Employees can upload their profile pictures, and the images are securely stored in the MySQL database.

* Employee Search Functionality:- A robust search feature enables users to quickly find specific employees based on various criteria.

* Pagination:- The system implements pagination to enhance the user experience by displaying a limited number of records per page.

* Validation:
  * Server-side Validation:- Ensures data integrity and security by implementing server-side validation for all incoming requests.
  * Frontend Validation:- Enhances the user experience by providing immediate feedback on form inputs using React.js and client-side validation.

## Technologies Used
* Frontend: React.js, HTML, CSS, Bootstrap
* Backend: Spring Boot, RESTful API
* Database: MySQL
  
## Home Page
![Dashboard](https://github.com/Ameylog/Employee-Management-System/assets/58946915/37d9e938-c807-45a2-bdd9-03cbd8789e1a)

## Add Employee
![Add Employee](https://github.com/Ameylog/Employee-Management-System/assets/58946915/2bcd0231-b6be-4fd2-aa2e-08d34ad67445)

## Validation
![Add Employee Validation](https://github.com/Ameylog/Employee-Management-System/assets/58946915/89a8717d-8970-4b36-af26-466e6dfa889e)

## Edit Employee
![Edit employee](https://github.com/Ameylog/Employee-Management-System/assets/58946915/c9d40763-2f29-4027-988c-4c80c3428105)

## Update Salary
![Update Salary](https://github.com/Ameylog/Employee-Management-System/assets/58946915/9771d32d-dc1e-41a4-9eb6-56149ad5d8b4)

## Updated Record
![Updated Record](https://github.com/Ameylog/Employee-Management-System/assets/58946915/b8d24d98-d522-49a1-8765-4055a3e5d1ea)

## After Deleting Second Record
![Seond Record Deleted](https://github.com/Ameylog/Employee-Management-System/assets/58946915/f3fc5e3e-6420-4989-83d4-f6da41ccd049)

## Search Record
![Seach Record](https://github.com/Ameylog/Employee-Management-System/assets/58946915/13ce1994-7a3f-4d03-9e52-9bbbc78d77c0)


## Install EMS_Frontend with npm

```bash
  npm install EMS_Frontend
  cd EMS_Frontend
```
### Install dependencies
```bash
   npm install "@testing-library/jest-dom@^5.16.5" "@testing-library/react@^13.3.0" "@testing-library/user-event@^13.5.0" "axios@^1.4.0" "bootstrap@^5.2.0" "cra-template@1.2.0" "install@^0.13.0" "react@^18.2.0" "react-bootstrap@^2.8.0" "react-dom@^18.2.0" "react-router-dom@^6.14.2" "react-scripts@5.0.1" "web-vitals@^2.1.4"
```
### Run the Project
```bash
   npm start
```

### If BootStrap is not working then add CDN in index.html file
Add after title tag
```bash
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
```
Add in body tag
```bash
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
```

## Contributions
Contributions are welcome! Feel free to fork the repository and submit pull requests to enhance the functionality or fix any issues.
