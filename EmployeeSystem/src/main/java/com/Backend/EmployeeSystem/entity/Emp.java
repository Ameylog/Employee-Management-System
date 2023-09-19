package com.Backend.EmployeeSystem.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
public class Emp {

    @Valid
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Enter the First Name")
    @NotBlank(message = "Enter the First Name")
    private String firstName;

    @NotNull(message = "Enter the Last Name")
    @NotBlank(message = "Enter the Last Name")
    private String lastName;

    @NotNull
    @Email(message = "Enter the email")
    @NotBlank(message = "Enter the email")
    private String email;

    @NotNull(message = "Enter the address")
    @NotBlank(message = "Enter the address")
    private String address;

    @NotNull(message = "Salary cannot be null")
    @Positive(message = "Salary must be a positive value")
    @NotBlank(message = "Salary cannot be blank")
    private Double salary;

    private String imageName;

    @Lob               // store binary format
    @Column(columnDefinition = "MEDIUMBLOB")
    @NotBlank(message="Image Required")
    private byte[] imageData;




}
