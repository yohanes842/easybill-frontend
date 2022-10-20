import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Route } from 'src/app/enums/Route';
import { LoginForm } from 'src/app/classes/login-form';
import { User } from 'src/app/classes/user';
import { Response } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginForm): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${env.url}/api/auth`, user).pipe(
      tap({
        next: (res) => {
          let user = res.output.data;
          localStorage.setItem('currentUser', JSON.stringify(user));
        },
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl(Route.LOGIN_PATH);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') != null ? true : false;
  }

  getCurrentUser(): User | null {
    let user = localStorage.getItem('currentUser');
    let userObject: User;
    if (user) {
      try {
        userObject = JSON.parse(user);
        delete userObject!['access_token'];
        return userObject;
      } catch (error) {
        localStorage.clear();
        this.router.navigateByUrl(Route.LOGIN_PATH);
        return null;
      }
    } else {
      return null;
    }
  }
}
