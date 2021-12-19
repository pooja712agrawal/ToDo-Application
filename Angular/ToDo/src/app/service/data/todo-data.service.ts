import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http : HttpClient) { }

  //Get All Todos
  getAllTodos(username : any){
      
      return this.http.get<Todo[]>(`${API_URL}/user/${username}/todos`);

  }

  //Delete Todo
  deleteTodo(username : any,id : number){

      return this.http.delete(`${API_URL}/user/${username}/todos/${id}`);
  }

  //Get a Todo and update todo
  retrieveTodo(username:any, id:number){
    return this.http.get<Todo>(`${API_URL}/user/${username}/todos/${id}`);
  }

  updateTodo(username:any,id:number,todo : Todo){
    return this.http.put(
                       `${API_URL}/user/${username}/todos/${id}`
                       ,todo);
  }

  //create todo
  createTodo(username:any,todo : Todo){
    return this.http.post(
                       `${API_URL}/user/${username}/todos`
                       ,todo);
  }
}
