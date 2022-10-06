import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Route } from 'src/app/enums/Route';
import { LoginForm } from 'src/app/classes/login-form';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginForm): Observable<any> {
    return this.http.post<any>(`${env.url}/api/auth`, user).pipe(
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
      userObject = JSON.parse(user);
      delete userObject!['access_token'];
      return userObject;
    } else {
      return null;
    }
  }
}
