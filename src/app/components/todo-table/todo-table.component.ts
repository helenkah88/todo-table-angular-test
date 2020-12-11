import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../../shared/interfaces/todo.interface';
import { ApiService } from '../../shared/services/api.service';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  @Output() rowClicked: EventEmitter<Todo> = new EventEmitter();

  columnsToDisplay: string[] = ['id', 'name', 'description', 'createdAt', 'editedAt', 'actions'];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog) { }

  todos$: Observable<Todo[]>;
  todos: Todo[] = [];

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todos$ = this.apiService.getAllTodos();
  }

  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(AddTodoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      
      if(!data) return;

      let todo: Todo = {
        ...data,
        createdAt: new Date().toJSON(),
        editedAt: new Date().toJSON()
      };

      this.apiService.saveTodo(todo).subscribe(() => {
        this.getAllTodos();
      });
    })
  }


  remove(id) {
    this.apiService.deleteTodo(id).subscribe(() => {
      this.getAllTodos();
    });
  }

  onRowClicked($event, row) {}

}
