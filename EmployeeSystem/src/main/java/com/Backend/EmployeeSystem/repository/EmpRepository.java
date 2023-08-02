package com.Backend.EmployeeSystem.repository;

import com.Backend.EmployeeSystem.entity.Emp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpRepository extends JpaRepository<Emp,Integer> {
}
