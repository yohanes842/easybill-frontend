import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user';
import { OutputResponse } from 'src/app/interfaces/output-response';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<Response<OutputResponse<User[]>>>(
      `${env.url}/api/users`
    );
  }

  public changeUserUsername(currentPassword: String, newUsername: String) {
    const params = {
      current_password: currentPassword,
      new_username: newUsername,
    };
    return this.http.put<Response<OutputResponse<void>>>(
      `${env.url}/api/users/username`,
      params
    );
  }

  public changeUserPassword(
    currentPassword: String,
    newPassword: String,
    confirmPassword: String
  ) {
    const params = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    return this.http.put<Response<OutputResponse<void>>>(
      `${env.url}/api/users/password`,
      params
    );
  }

  public changeUserAccountNumber(password: string, accountNumber: string) {
    const params = {
      current_password: password,
      new_account_number: accountNumber,
    };
    return this.http.put<Response<OutputResponse<void>>>(
      `${env.url}/api/users/account-number`,
      params
    );
  }
}
