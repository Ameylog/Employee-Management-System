package com.Backend.EmployeeSystem.service;

import com.Backend.EmployeeSystem.entity.Emp;
import com.Backend.EmployeeSystem.payload.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
import java.io.IOException;
import java.util.List;

public interface EmpService {

    public Emp createEmp(Emp emp,MultipartFile file) throws IOException;

    // Pagable
//    Page<Emp> getAllEmp(int page,int size);

    PostResponse getAllEmp(Integer pageNumber, Integer pageSize);

//   List<Emp> getAllEmp();

    public Emp getEmpById(Long id);
    public List<Emp> getEmpByFirstName(String keyword);
    public void deleteEmp(Long id);
    public void updateEmp(Long id, Emp emp, MultipartFile file) throws IOException;

}