package com.todo.Todo.Application.Controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.todo.Todo.Application.bean.Todo;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
public class TodoController {
	
	@Autowired
	TodoJPARepository todoJPARepository;
	
	@GetMapping("user/{username}/todos")
	public List<Todo> getTodos(@PathVariable( value = "username") String username){

		return todoJPARepository.findByUsername(username);
	}
	
	@DeleteMapping("user/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username , @PathVariable Integer id){
		
		 todoJPARepository.deleteById(id);
		 return ResponseEntity.noContent().build();
	}
	
	@GetMapping("user/{username}/todos/{id}")
	public Optional<Todo> getTodo(@PathVariable String username,@PathVariable Integer id){
		
		return todoJPARepository.findById(id);
	}
	
	@PutMapping("user/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username , @PathVariable Integer id, @RequestBody Todo todo){
		
		 Todo todoUpdated = todoJPARepository.save(todo);
		 return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	@PostMapping("user/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username , @RequestBody Todo todo){
		
		 todo.setUsername(username);
		 Todo todoCreated = todoJPARepository.save(todo);		 
		 
		 //taking current req path and appending id to it
		 URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		                            .path("/{id}")
		                            .buildAndExpand(todoCreated.getId())
		                            .toUri();
		 
		 return ResponseEntity.created(uri).build();
		 
	}

}
