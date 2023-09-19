package com.Backend.EmployeeSystem.service;

import com.Backend.EmployeeSystem.repository.EmpRepository;
import com.Backend.EmployeeSystem.entity.Emp;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class EmpServiceImpl implements EmpService {

    @Autowired
    private EmpRepository empRepo;

    @Override
    public Emp createEmp(Emp emp, MultipartFile file) {
        try {
            Emp emp1 = new Emp();
            emp1.setId(emp.getId());
            emp1.setFirstName(emp.getFirstName());
            emp1.setLastName(emp.getLastName());
            emp1.setEmail(emp.getEmail());
            emp1.setAddress(emp.getAddress());
            emp1.setSalary(emp.getSalary());
            emp1.setImageName(file.getOriginalFilename());
            emp1.setImageData(file.getBytes());
            return empRepo.save(emp1);
        } catch (IOException e) {
            throw new RuntimeException("Employee details not save:- "+ e);
        }

    }

    @Override
    public List<Emp> getAllEmp() {
        return empRepo.findAll();
    }

    @Override
    public Emp getEmpById(Long id) {
        return empRepo.findById(id).get();
    }

    @Override
    public  List<Emp> getEmpByFirstName(String keyword) {
            return empRepo.findByfirstName(keyword);
    }

    
    @Override
    public void deleteEmp(Long id) {
        Emp emp = empRepo.findById(id).get();
        if (emp != null) {
            empRepo.delete(emp);
        }
    }

    @Override
    public void updateEmp(Long id, Emp emp, MultipartFile file) throws IOException {

        Optional<Emp> optionalEmp = empRepo.findById(id);

        if (optionalEmp.isPresent()) {
            Emp existingEmp = optionalEmp.get();
            existingEmp.setFirstName(emp.getFirstName());
            existingEmp.setLastName(emp.getLastName());
            existingEmp.setEmail(emp.getEmail());
            existingEmp.setAddress(emp.getAddress());
            existingEmp.setSalary(emp.getSalary());

            // Handle the image file (if provided)
            if (file != null && !file.isEmpty()) {
                byte[] imageData = file.getBytes();
                existingEmp.setImageData(imageData);
                existingEmp.setImageName(file.getOriginalFilename());  // get Original file
            }
            empRepo.save(existingEmp);
        } else {
            throw new EntityNotFoundException("Employee not found with id: " + id);
        }
    }


}



