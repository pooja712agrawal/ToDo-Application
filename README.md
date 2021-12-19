#Prerequisite
1. Install Node
2. Install Angular CLI 
3. Install Java
4. Install maven


#Here, in this application 
FrontEnd is created in Angular 
Backend is in SpringBoot and JPA
In memory Database is H2 DB

To run the application follow the below steps
1. Open command prompt and go to SpringBoot application (ToDo Application\SpringBoot\Todo-Application) then use the following command to run springboot application.
      - mvn spring-boot:run
      
2. Open Command prompt and go to Angular project location(ToDo Application\Angular\ToDo) then use following commands to run Angular application.
    - npm install 
    - ng serve 
    - once build is successful open http://localhost:4200/ in a browser, login page will be displayed
    - Login crendetials - username : test and password : pwd123
    
3. Open http://localhost:8080/h2-console to open the H2 DB console.
      - Dialog Window will appear. 
      - Enter credentials as Username - test password - pwd123
      - Add JDBC URL - jdbc:h2:mem:testdb
      - Click connect
      - Once successfully connected, you can see TODO table
      
4. To change the username and password, make a change in application.properties file in SpringBoot project
