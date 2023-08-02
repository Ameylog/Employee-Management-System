package com.Backend.EmployeeSystem.service;

import com.Backend.EmployeeSystem.repository.EmpRepository;
import com.Backend.EmployeeSystem.entity.Emp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpServiceImpl implements EmpService {

    @Autowired
    private EmpRepository empRepo;

    @Override
    public Emp createEmp(Emp emp) {
        return empRepo.save(emp);
    }

    @Override
    public List<Emp> getAllEmp() {

        return empRepo.findAll();
    }

    @Override
    public Emp getEmpById(int id) {
        return empRepo.findById(id).get();
    }

    @Override
    public void deleteEmp(int id) {
        Emp emp = empRepo.findById(id).get();
        if (emp != null) {
            empRepo.delete(emp);
        }
    }

    @Override
    public Emp updateEmp(int id, Emp emp) {

        Emp oldEmp = empRepo.findById(id).get();

        if (oldEmp != null) {
            emp.setId(id);
            return empRepo.save(emp);
        }

        return null;
    }

}