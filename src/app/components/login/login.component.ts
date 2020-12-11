import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  form: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  getErrorMessage(fieldName: FormControl) {
    if (fieldName.hasError('required')) {
      return 'This field is required';
    }
  }

  login() {
    this.authService.setAuth();
    this.router.navigate(['/']);
  }
}
