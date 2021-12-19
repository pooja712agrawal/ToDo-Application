package com.todo.basic.auth;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter{
	
	
	
	//copy this method from WebSecurityConfigurerAdaptor class to solve csrf disabled problem /options class problem
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		//OAuth2
		
		/*
		 * http.authorizeRequests() .anyRequest().authenticated() .and().oauth2Login();
		 */
		
		//Basic Authorization
		
		
		  http .csrf().disable() .authorizeRequests()
		  .antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
		  // enable OPTIONS methodto solve the problem
		  .anyRequest().authenticated(); 
		  //below line to solve H2 db issue 
          http.headers().frameOptions().disable(); 
		  ////http.formLogin();
		  http.httpBasic();
		 
		 
	}
	
	

}
