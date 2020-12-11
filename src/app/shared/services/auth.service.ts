import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isAuthenticated() {
    return localStorage.getItem('isAuthenticated');
  }

  setAuth() {
    localStorage.setItem('isAuthenticated', 'true');
  }

  clearAuth() {
    localStorage.removeItem('isAuthenticated');
  }

  constructor() { }
}
