package com.todo.Todo.Application;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.Todo.Application.Controller.TodoJPARepository;
import com.todo.Todo.Application.bean.Todo;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class TodoApplicationTests {

	@MockBean
	TodoJPARepository todoJPARepository;

	@Autowired
	private MockMvc mockMvc;
	
	Todo todoObj = getTodoObject();

	@Test
	void contextLoads() {
	}

   // Testcase to get the TODO list
	@Test
	void getTodosTest() throws Exception {

		List<Todo> todoList = new ArrayList<Todo>();
		todoList.add((getTodoObject()));

		when(todoJPARepository.findByUsername("test")).thenReturn(todoList);

		this.mockMvc.perform(get("/user/test/todos")).andDo(print()).andExpect(status().isOk())
				.andExpect(jsonPath("$.length()", is(1)));

	}

	// Testcase to delete the TODO item
	@Test
	void deleteTodoTest() throws Exception {

		doNothing().when(todoJPARepository).delete(todoObj);

		this.mockMvc.perform(delete("/user/test/todos/1001")).andExpect(status().isNoContent());
	}
	
	//Testcase to get the TODO item by id
	@Test
	void getTodoByIdTest() throws Exception {
				
		this.mockMvc.perform(get("/user/test/todos/1001"))
		.andDo(print())
		.andExpect(status().isOk());
		
	}
	
	//Testcase to add  the TODO item
	@Test
	void createTodoTest() throws Exception {
		
		ObjectMapper objMapper = new ObjectMapper();
		String jsonString = objMapper.writeValueAsString(todoObj);
		
		when(todoJPARepository.save(any())).thenReturn(todoObj);
				
		this.mockMvc.perform(post("/user/test/todos").contentType(MediaType.APPLICATION_JSON)
				.content(jsonString))
		        .andDo(print())
		        .andExpect(status().isCreated());
		
	}
	

	// Todo object
	public Todo getTodoObject() {

		Todo todoObject = new Todo();

		todoObject.setId(1001);
		todoObject.setUsername("test");
		todoObject.setDescription("Complete the assignment");
		todoObject.setTargetDate(new Date());
		todoObject.setDone(false);
		return todoObject;
	}
	

}
