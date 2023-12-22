package com.Backend.EmployeeSystem.entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Data
public class Emp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Enter the First Name")
    @NotBlank(message = "Enter the First Name")
    private String firstName;

    @NotNull(message = "Enter the Last Name")
    @NotBlank(message = "Enter the Last Name")
    private String lastName;


    @Email(message = "Enter the email")
    @NotBlank(message = "Enter the email")
    private String email;

    @NotNull(message = "Enter the address")
    @NotBlank(message = "Enter the address")
    private String address;


    @Positive(message = "Salary must be a positive value")
    @NotBlank(message = "Salary cannot be blank")
    private Double salary;

    private String imageName;

    @Lob               // store binary format
    @Column(columnDefinition = "MEDIUMBLOB")
    @NotBlank(message="Image Required")
    private byte[] imageData;

    public Emp() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public Emp(Long id, String firstName, String lastName, String email, String address, Double salary, String imageName,
                  @NotBlank(message = "Image Required") byte[] imageData) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.salary = salary;
        this.imageName = imageName;
        this.imageData = imageData;
    }


}
