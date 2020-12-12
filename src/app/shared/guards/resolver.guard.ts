import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Todo } from '../interfaces/todo.interface';


@Injectable({
  providedIn: 'root'
})
export class TodoResolver implements Resolve<any> {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getTodoById(route.paramMap.get('id')).pipe(
      catchError(() => empty())
    );
  }
}
