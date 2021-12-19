package com.todo.Welcome.Application.Bean;

import org.springframework.stereotype.Component;

@Component
public class WelcomeBean {
	
	private String message;
    
	public WelcomeBean() {
		
	}
	public WelcomeBean(String message) {
		this.message = message;
	}
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
	
	

}
