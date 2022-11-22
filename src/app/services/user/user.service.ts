import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${env.url}/api/users`);
  }

  public getUserDetail(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${env.url}/api/users/profile`);
  }

  public changeUserUsername(
    currentPassword: String,
    newUsername: String
  ): Observable<Response<void>> {
    const params = {
      current_password: currentPassword,
      new_username: newUsername,
    };
    return this.http.put<Response<void>>(
      `${env.url}/api/users/username`,
      params
    );
  }

  public changeUserPassword(
    currentPassword: String,
    newPassword: String,
    confirmPassword: String
  ): Observable<Response<void>> {
    const params = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    return this.http.put<Response<void>>(
      `${env.url}/api/users/password`,
      params
    );
  }

  public changeUserAccountNumber(
    password: string,
    accountNumber: string
  ): Observable<Response<void>> {
    const params = {
      current_password: password,
      new_account_number: accountNumber,
    };
    return this.http.put<Response<void>>(
      `${env.url}/api/users/account-number`,
      params
    );
  }
}
