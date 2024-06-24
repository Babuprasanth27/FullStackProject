package com.Project_2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project_2.model.Student;
import com.Project_2.repository.StudentRepository;
@Service


public class StudentServiceImpl implements StudentService {
	
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Override
	public Student saveStudent(Student student) {
		return studentRepository.save(student);
	}

	@Override
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}
	
	@Override
	public Student updateStudent(int id, Student updateStudent) {
	    Optional<Student> optionalStudent = studentRepository.findById(id);
	    if (optionalStudent.isPresent()) {
	        Student student = optionalStudent.get();
	        student.setName(updateStudent.getName());
	        student.setAddress(updateStudent.getAddress());
	        return studentRepository.save(student);
	    } else {
	    	 return null;
	    }
	}

	@Override
    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }


	 
	 
	
}
