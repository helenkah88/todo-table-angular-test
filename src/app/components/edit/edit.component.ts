import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { Todo } from '../../shared/interfaces/todo.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  todo: Todo;

  deleteTodoSubscription: Subscription;

  updateTodoSubscription: Subscription;

  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      createdAt: new FormControl(''),
      editedAt: new FormControl('')
    });

    this.todo = this.route.snapshot.data.todo;

    if (this.todo) {
      this.populateForm();
    }
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  private populateForm() {
    this.form.setValue({
      name: this.todo.name,
      description: this.todo.description,
      createdAt: this.todo.createdAt,
      editedAt: this.todo.editedAt,
    });
  }

  getErrorMessage(fieldName: FormControl) {
    if (fieldName.hasError('required')) {
      return 'This field is required';
    }
  }

  remove() {
    if (!window.confirm('Are you sure you want to remove this item?')) return;

    this.deleteTodoSubscription = this.apiService.deleteTodo(this.todo.id).subscribe(() => {
      this.router.navigate(['/']);
    });

    this.subscriptions.push(this.deleteTodoSubscription);
  }

  save(form) {
    this.form.patchValue({
      editedAt: new Date()
    });

    this.updateTodoSubscription = this.apiService.updateTodo(this.todo.id, this.form.value).subscribe(() => {
      this.router.navigate(['/']);
    });

    this.subscriptions.push(this.updateTodoSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) subscription.unsubscribe();
    });
  }
}
