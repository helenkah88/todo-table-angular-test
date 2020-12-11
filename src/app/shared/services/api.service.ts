import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:3000/todos/';

  constructor(private http: HttpClient) { }

  getAllTodos() {
    return this.http.get<Todo[]>(this.BASE_URL).pipe(
      catchError(err => of(err))
    );
  }

  saveTodo(todo) {
    return this.http.post<Todo>(this.BASE_URL, todo).pipe(
      catchError(err => of(err))
    );
  }

  updateTodo(id, todo) {
    return this.http.put(this.BASE_URL + id, todo).pipe(
      catchError(err => of(err))
    );
  }

  deleteTodo(id) {
    return this.http.delete(this.BASE_URL + id).pipe(
      catchError(err => of(err))
    );
  }
/*
  getByTrack(track) {
    const params = track ? {
      params: new HttpParams({ fromString: 'method=track.search&format=json&track=' + track})
    } : {};

    return this.http.get(this.BASE_URL, params).pipe(
      map((response: any) => {
        return response.results.trackmatches.track.map((item: any) => new Track(item.name, item.artist));
      }),
      catchError(err => of(err))
    );
  }*/
/*
  saveTodoToEdit(todo) {
    this.todoToEdit = todo;
    return Promise.resolve();
  }*/
}
