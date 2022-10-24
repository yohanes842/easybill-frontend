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
}
