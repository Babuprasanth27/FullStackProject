package com.Project_2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Project_2.model.Student;
import com.Project_2.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	
	 @PostMapping("/add")
	    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
	        Student savedStudent = studentService.saveStudent(student);
	        return ResponseEntity.ok(savedStudent);
	    }
	 
	
	 @GetMapping("/getAll")
		public List<Student> getAllStudent(){
			return studentService.getAllStudents();
		}
	
	
	 @PutMapping("/update/{id}")
    	public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
	        Student student = studentService.updateStudent(id, updatedStudent);
	        if (student != null) {
	            return ResponseEntity.ok(student);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
    	}
	  @DeleteMapping("/delete/{id}")
	 	public ResponseEntity<Void> deleteStudent(@PathVariable int id) {
	        studentService.deleteStudent(id);
	        return ResponseEntity.noContent().build();
    }
}
