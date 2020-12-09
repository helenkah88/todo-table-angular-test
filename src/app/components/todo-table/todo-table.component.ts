import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../../shared/interfaces/todo.interface';

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

  dataSource$: Observable<Todo[]> = of(DATA);

  columnsToDisplay: string[] = ['id', 'name', 'description', 'createdAt', 'editedAt', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  add() {}

  onRowClicked($event, row) {}

}
