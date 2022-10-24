import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginForm } from 'src/app/classes/login-form';
import { User } from 'src/app/classes/user';
import { ResponseStatus } from 'src/app/enums/ResponseStatus';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';
import { CustomMessageService } from '../message/custom-message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: CustomMessageService
  ) {}

  login(user: LoginForm): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${env.url}/api/auth`, user).pipe(
      tap({
        next: (res: Response<User>) => {
          let user = res.output.data;
          localStorage.setItem('currentUser', JSON.stringify(user));
        },
        error: (err: ErrorResponse) => {
          let { code, message } = err;
          let errMsg;
          switch (code) {
            case ResponseStatus.USER_NOT_FOUND:
            case ResponseStatus.INVALID_CREDENTIALS:
              errMsg = 'Username or password invalid!';
              break;
            default:
              errMsg = message;
              break;
          }
          this.messageService.showMessage(
            Severity.ERROR,
            'LOGIN ERROR',
            errMsg
          );
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

  getCurrentUser(): User | undefined {
    let user = localStorage.getItem('currentUser');
    let userObject: User;

    if (!user) {
      this.router.navigateByUrl(Route.LOGIN_PATH);
      return;
    }

    try {
      userObject = JSON.parse(user!);
      delete userObject!['access_token'];
      return userObject;
    } catch (error) {
      localStorage.clear();
      this.router.navigateByUrl(Route.LOGIN_PATH);
    }
    return;
  }
}
