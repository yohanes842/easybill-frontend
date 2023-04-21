import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, tap } from 'rxjs';
import { LoginForm } from 'src/app/classes/login-form';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { OutputResponse } from 'src/app/interfaces/output-response';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: User;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginForm) {
    return this.http
      .post<Response<OutputResponse<User>>>(`${env.url}/api/auth`, user)
      .pipe(
        tap({
          next: (res) => {
            this.authUser = res.output.data;
            localStorage.setItem('accessToken', this.authUser.access_token!);
          },
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl(Route.LOGIN_PATH);
  }

  getAuthUser() {
    if (!this.authUser) return this.getLatestAuthUser();
    return of(this.authUser);
  }

  getLatestAuthUser() {
    return this.http
      .get<Response<OutputResponse<User>>>(`${env.url}/api/users/profile`)
      .pipe(
        map((res) => {
          this.authUser = res.output.data;
          return res.output.data;
        })
      );
  }
}
