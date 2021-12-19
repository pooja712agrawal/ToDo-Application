import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

//Todo Bean class
export class Todo{

  constructor(
    public usename : any,
    public id :number,
    public description : string,
    public done : any,
    public targetDate : Date
  ){
  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})

export class ListTodosComponent implements OnInit {

  username : any
  todos :any 
  errorMsgFromSpring = ''
  deleteMsg : string = ''

  constructor(
    private todoDataService : TodoDataService,
    private router : Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('authenticatedUser');
    this.refreshTodo()  
  }

  // Get All Todos list
  refreshTodo(){

    this.todoDataService.getAllTodos(this.username).subscribe(
     
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorMessage(error)

    )
    console.log(this.username)
  }

 

  //If response is successful
  handleSuccessfulResponse(response: any) {
    this.todos = response
   
    for(let todo of this.todos){
    if(todo.done == false){
        todo.done = "In Progress"
    }
    else{
      todo.done = "Done"
    }
  }
  }

  //If error occur
  handleErrorMessage(error: any) {
    this.errorMsgFromSpring = error.error.message;
  }
  
  //Delete Todo method
  deleteTodo(id : number){

    this.todoDataService.deleteTodo(this.username, id).subscribe(

      response => {
        this.deleteMsg = `Todo ${id} id deleted Successfully`
        this.refreshTodo();
      }

    )

  }

  //Update Todo method
  updatetodo(id : number){
     this.router.navigate([`todos`,id])
  }

  //Add Todo method
  addTodo(){
    this.router.navigate([`todos`,-1])
  }

}
