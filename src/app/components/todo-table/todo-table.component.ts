import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../../shared/interfaces/todo.interface';
import { ApiService } from '../../shared/services/api.service';

//mocked data
const DATA: Todo[] = [
  { id: 1, name: 'gi', description: 'ihgg rugh ohore', createdAt: new Date(), editedAt: new Date() }
];

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  @Output() rowClicked: EventEmitter<Todo> = new EventEmitter();

  columnsToDisplay: string[] = ['id', 'name', 'description', 'createdAt', 'editedAt', 'actions'];

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) { }

  todos$: Observable<Todo[]>;
  todos: Todo[] = [];

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.apiService.getAllTodos().subscribe(data => {
      this.todos = data;
      this.cd.markForCheck();
    })
    // this.todos$ = this.apiService.getAllTodos();
  }

  add() {
    let todo = { name: 'gi', description: 'ihgg rugh ohore', createdAt: new Date().toJSON(), editedAt: new Date().toJSON() }
    this.apiService.addTodoItem(todo).subscribe(() => {
      this.getAllTodos();
    });
  }

  remove(id) {
    this.apiService.deleteTodoItem(id).subscribe(() => {
      this.getAllTodos();
    });
  }

  onRowClicked($event, row) {}

}
