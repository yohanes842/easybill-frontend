import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { LoginForm } from 'src/app/classes/login-form';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  login(user: LoginForm): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${env.url}/api/auth`, user).pipe(
      tap({
        next: (res: Response<User>) => {
          this.authUser = res.output.data;
          localStorage.setItem('accessToken', this.authUser.access_token!);
        },
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl(Route.LOGIN_PATH);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('accessToken') != null ? true : false;
  }

  getAuthUser(): Observable<User> {
    if (!this.authUser) {
      return this.http.get<Response<User>>(`${env.url}/api/users/profile`).pipe(
        map((res: Response<User>) => {
          this.authUser = res.output.data;
          return res.output.data;
        })
      );
    }
    return of(this.authUser);
  }
}
