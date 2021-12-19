#Here, in this application 
FrontEnd is created in Angular 
Backend is in SpringBoot and JPA
In memory Database is H2 DB

To run the application follow the below steps
1. Open Command prompt and go to Angular project location and the use "ng serve" command to run the Angular Application
2. Run the Spring boot Application in Eclipse.
3. Open http://localhost:8080/h2-console to open the H2 DB console.
   JDBC URL - jdbc:h2:mem:testdb
4. In DB, TODO table is there which is used in this application.
5. Login crendetials - username : test and password : pwd123
6. To change the username and password make a change in application.properties file in SpringBoot project
