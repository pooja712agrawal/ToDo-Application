package com.todo.basic.auth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.basic.auth.bean.AuthenticationBean;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
public class AuthController {
	
	@GetMapping("/auth")
	public AuthenticationBean basicAuth() {
		
		return new AuthenticationBean("You are authenticated");
	}
	
	@GetMapping
	public String login() {
		
		return "Welcome";
	}

}
