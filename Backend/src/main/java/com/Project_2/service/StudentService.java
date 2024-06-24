package com.Project_2.service;

import java.util.List;

import com.Project_2.model.Student;

public interface StudentService {
	public Student saveStudent(Student student);
	public List<Student> getAllStudents();
	Student updateStudent(int id, Student updateStudent);
	void deleteStudent(int id);
}
