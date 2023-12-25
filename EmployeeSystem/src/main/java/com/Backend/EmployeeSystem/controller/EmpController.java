package com.Backend.EmployeeSystem.controller;

import java.util.List;

import com.Backend.EmployeeSystem.payload.PostResponse;
import com.Backend.EmployeeSystem.service.EmpService;
import com.Backend.EmployeeSystem.entity.Emp;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"},
              methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/v1")

public class EmpController {
    @Autowired
    private EmpService empService;

    @PostMapping("/save")
    public ResponseEntity<String> createEmp(@Valid @RequestParam("emp") String empJson,
                                             @RequestParam("file") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Emp emp = objectMapper.readValue(empJson, Emp.class);
            empService.createEmp(emp, file);
            return ResponseEntity.ok("Data and Image Upload Successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data or Image are Missing ");
        }
    }

    // Get All Rows
//    @GetMapping("/getAll")
//    public ResponseEntity<List<Emp>> getAllEmp() {
//        return new ResponseEntity<List<Emp>>(empService.getAllEmp(), HttpStatus.OK);
//    }
  
   // get All with pagination
    @GetMapping("/getAll")
    public ResponseEntity<PostResponse> getAllEmp(@RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
                                                  @RequestParam(value = "pageSize",defaultValue = "5",required = false) Integer pageSize) {
        PostResponse postResponse=this.empService.getAllEmp(pageNumber,pageSize);
        return new ResponseEntity<PostResponse>(postResponse, HttpStatus.OK);
    }


    //  Get By id
    @GetMapping("/get/{id}")
    public ResponseEntity<Emp> getEmpById(@PathVariable Long id) {
        return new ResponseEntity<Emp>(empService.getEmpById(id), HttpStatus.OK);
    }

    // Search by Name [Search Box code]
    @GetMapping("/gets/{keyword}")
    public ResponseEntity<List<Emp>> getEmpByFirstName(@PathVariable String keyword) {

        return new ResponseEntity<List<Emp>>(empService.getEmpByFirstName(keyword), HttpStatus.OK);
    }
    // Delete By Id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmp(@PathVariable Long id) {

        empService.deleteEmp(id);
        return new ResponseEntity<String>("Delete Sucessfully", HttpStatus.OK);
    }

    // Update Record
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEmp(@PathVariable Long id,@Valid  @RequestParam("emp") String employeeJson,
                                            @Valid @RequestParam("file") MultipartFile file) {
        try {

            ObjectMapper objectMapper = new ObjectMapper();
            Emp emp = objectMapper.readValue(employeeJson, Emp.class);
            empService.updateEmp(id,emp, file);
            return ResponseEntity.ok("Employee updated successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating employee");
        }
    }

  // Patch mapping alternate of put mapping
//    @PatchMapping("/update/{id}")
//    public ResponseEntity<String> partialUpdateEmp(
//            @Valid @PathVariable Long id,
//            @Valid @RequestBody Map<String, Object> updates, // Receive a map of fields to update
//            @RequestParam(value = "file", required = false) MultipartFile file,
//            BindingResult result
//    ) {
//        try {
//            Emp existingEmp = empService.getEmpById(id);
//
//            if (existingEmp == null) {
//                return ResponseEntity.notFound().build();
//            }
//
//            // Update fields based on the received updates
//            ObjectMapper objectMapper = new ObjectMapper();
//            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//            Emp updatedEmp = objectMapper.convertValue(updates, Emp.class);
//
//            // Merge the updated fields into the existing employee
//            if (updatedEmp.getFirstName() != null) {
//                existingEmp.setFirstName(updatedEmp.getFirstName());
//            }
//            if (updatedEmp.getLastName() != null) {
//                existingEmp.setLastName(updatedEmp.getLastName());
//            }
//            // Add more fields as needed
//
//            // Update the employee with the merged data
//            empService.updateEmp(id, existingEmp, file);
//
//            return ResponseEntity.ok("Employee updated successfully");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating employee");
//        }
//    }


}
