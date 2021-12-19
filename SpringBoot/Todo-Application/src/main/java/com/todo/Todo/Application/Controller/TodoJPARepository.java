package com.todo.Todo.Application.Controller;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.Todo.Application.bean.Todo;

@Repository
public interface TodoJPARepository extends JpaRepository<Todo,Integer>{
	
	List<Todo> findByUsername(String username);
	

}
