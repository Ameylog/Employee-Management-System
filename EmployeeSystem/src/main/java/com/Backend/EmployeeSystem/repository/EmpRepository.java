package com.Backend.EmployeeSystem.repository;

import com.Backend.EmployeeSystem.entity.Emp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EmpRepository extends JpaRepository<Emp,Long> {

    ////////////////
    List<Emp> findByfirstName(String keyword);

}
