import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Observable,
  Subscription,
  of
} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from '../../shared/interfaces/todo.interface';
import { ApiService } from '../../shared/services/api.service';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit, OnDestroy {

  @Output() rowClicked: EventEmitter<Todo> = new EventEmitter();

  subscriptions: Subscription[] = [];

  dialogSubscription: Subscription;

  deleteTodoSubscription: Subscription;

  saveTodoSubscription: Subscription;

  columnsToDisplay: string[] = ['id', 'name', 'description', 'createdAt', 'editedAt', 'actions'];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) { }

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

    this.dialogSubscription = dialogRef.afterClosed().subscribe(data => {
      
      if(!data) return;

      let todo: Todo = {
        ...data,
        createdAt: new Date().toJSON(),
        editedAt: new Date().toJSON()
      };

      this.saveTodoSubscription = this.apiService.saveTodo(todo).subscribe(() => {
        this.getAllTodos();
      });
    });

    this.subscriptions.push(this.dialogSubscription);

    this.subscriptions.push(this.saveTodoSubscription);
  }

  remove($event: MouseEvent, id) {
    $event.stopPropagation();

    if (!window.confirm('Are you sure you want to remove this item?')) return;

     this.deleteTodoSubscription = this.apiService.deleteTodo(id).subscribe(() => {
      this.getAllTodos();
    });

    this.subscriptions.push(this.deleteTodoSubscription);
  }

  onRowClicked($event, row) {
    window.open('/edit/' + row.id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) subscription.unsubscribe();
    });
  }

}
