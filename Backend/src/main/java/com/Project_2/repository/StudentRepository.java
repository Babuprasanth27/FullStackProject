package com.Project_2.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Project_2.model.Student;
@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{

}
