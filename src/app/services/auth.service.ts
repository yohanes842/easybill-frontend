import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Route } from '../constant/Route';
import { LoginForm } from '../interfaces/login-form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginForm): Observable<any> {
    return this.http.post<any>(`${env.url}/api/auth`, user);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl(Route.LOGIN_PATH);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') != null ? true : false;
  }
}
