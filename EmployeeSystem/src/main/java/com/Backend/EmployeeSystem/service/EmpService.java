package com.Backend.EmployeeSystem.service;


import com.Backend.EmployeeSystem.entity.Emp;

import java.util.List;

public interface EmpService {

    public Emp createEmp(Emp emp);

    public List<Emp> getAllEmp();

    public Emp getEmpById(int id);

    public void deleteEmp(int id);

    public Emp updateEmp(int id, Emp emp);

}