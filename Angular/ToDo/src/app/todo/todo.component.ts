import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: Todo
  id: number
  username : any
  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('authenticatedUser');
    console.log(this.username)
    this.id = +this.route.snapshot.params[`id`]
    this.todo = new Todo(this.username,this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoDataService.retrieveTodo(this.username, this.id)
        .subscribe(
          data => this.todo = data
        )
    }
  }

  saveTodo() {

    if (this.id === -1) {
      //if add todo
      this.todoDataService.createTodo(this.username, this.todo)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['todos']);
        }
      )

    }
    else {
      //if update todo
      this.todoDataService.updateTodo(this.username, this.id, this.todo)
        .subscribe(
          data => {
            this.router.navigate(['todos']);
          }
        )
    }
  }

}
