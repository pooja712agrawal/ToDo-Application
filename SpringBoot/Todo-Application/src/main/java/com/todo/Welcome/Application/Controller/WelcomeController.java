package com.todo.Welcome.Application.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.todo.Welcome.Application.Bean.WelcomeBean;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
public class WelcomeController {
	
	@GetMapping("/welcome/{name}")
	public WelcomeBean getWelcomeMsg(@PathVariable( value = "name") String name) {
		
		String msg = "Hello " + name;
		return new WelcomeBean(msg);
		
	}

}
